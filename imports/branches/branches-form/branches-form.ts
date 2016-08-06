import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES} from '@angular/common';

// Admir
// import {Branches} from '../../imports/api/branches';
// import {Modal} from '../directives/modal/modal';
import {TabView} from '../../directives/tabview/tabview';
import {TabPanel} from '../../directives/tabview/tabpanel';
// import {BranchesTab1} from '../../imports/branches-form/branches-tab1';
// import {BranchesTab2} from '../../imports/branches-form/branches-tab2';
import {ADMediaUpload} from '../../directives/mediaUpload/adMediaUpload';
// import {BranchesItem} from '../../imports/branches-item/branches-item';

import {CORE_DIRECTIVES} from '@angular/common';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import template from './branches-form.html';
@Component({
  selector: 'branches-form',
  template,
  directives: [TabView, TabPanel, FORM_DIRECTIVES, ADMediaUpload, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES],
})
export class BranchesForm extends MeteorComponent implements OnInit {
  @Input() branchModelItem;
  @Input() action;
  branchesForm: ControlGroup;
  @Output() HideDialogEvent: EventEmitter<any> = new EventEmitter();
  @Output() DeleteObjectEvent: EventEmitter<any> = new EventEmitter();
  @Output() AreaItemsReadyEvent: EventEmitter<any> = new EventEmitter();
  n: number = 0;
  data: any;
  email: any;
  roles2: Mongo.Cursor<Object>;
  savedRoles: Array<string> = [];

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  // public items: Array<string> = ['Butcher',
  //   'Candlestick maker', 'Baker'];
  public areaItems: Array<Object> = [];
  private searchString: string = ""

  constructor() {
    super()

    // this.AreaItemsReadyEvent.subscribe((args) => {


    //   console.log("hello from RolesItemsReadyEvent")

    //   // if (this.branchModelItem.roles != null) {
    //   //   console.log("this.branchModelItem.roles.default-group");
    //   //   console.dir(this.branchModelItem.roles['default-group']);

    //   //   for (var i = 0; i < this.branchModelItem.roles['default-group'].length; i++) {

    //   //     this.savedRoles.push(this.branchModelItem.roles['default-group'][i]);



    //   //     // Remove new role from dropdown list, not available    
    //   //     var dropDownindex = this.items.indexOf(this.branchModelItem.roles['default-group'][i], 0);
    //   //     if (dropDownindex > -1) {
    //   //       this.items.splice(dropDownindex, 1);
    //   //     }


    //   //   }
    //   //   // this.savedRoles = this.branchModelItem.roles['default-group'];

    //   //   console.log("this.items");
    //   //   console.dir(this.items);
    //   //   console.log("this.savedRoles");
    //   //   console.dir(this.savedRoles);


    //   // }


    // });

    // if (this.branchModelItem == null){this.branchModelItem = new Object()}
    let fb = new FormBuilder();

    this.branchesForm = fb.group({
      imageAsData: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      town: ['', Validators.required],
      county: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      _id: '',
      width: [320, Validators.minLength(3)],
      height: [180, Validators.minLength(3)],
      areaDescription: [''],
      areaId: [''],


    });

    // this.email = this.branchesForm.controls['email'];
    // this.email.valueChanges.subscribe(
    //   (value: string) => {
    //     console.log('email changed to:', value);
    //   }
    // );
    // console.log("branchModelItem");
    // console.dir(this.branchModelItem);

    var self = this;
    Meteor.call('areas.get', function (error, result) {

      result.forEach(function (area) {
        self.areaItems.push(area)
        // console.dir(role)
      });

      var o = new Object();
      o.time = new Date();
      self.AreaItemsReadyEvent.emit(o)

    });

  }

  ngOnInit() {

  }

  addBranch(branch) {


    if (this.branchesForm.valid) {
      if (Meteor.userId()) {

        Meteor.call('branches.insert', branch);

        /* Clear the controls */
        for (var field in this.branchesForm.controls) {
          if (field != "_id") {
            (<Control>this.branchesForm.controls[field]).updateValue('');
            this.branchModelItem[field] = "";
          }
        }

        this.hideDialog();
      } else {
        alert('Please log in to add a branch');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  updateBranch(branch) {


    if (this.branchesForm.valid) {
      if (Meteor.userId()) {

        // console.dir(branch)
        // console.log("branch._id")
        // console.log(branch._id)
        // console.log(this.branchesForm.value);
        // console.dir(this.branchesForm.controls);

        /* Build up $set dynamically so we send all fields on the controls */
        var $set = {};

        for (var field in this.branchesForm.controls) {
          if (field != "_id") {
            $set[field] = this.branchesForm.controls[field].value;
          }
        }

        // $set['roles'] = { 'default-group': this.branchModelItem.roles['default-group'] };


        Meteor.call('branches.update', { _id: branch._id }, {

          $set: $set
          // Static way
          // $set: { 
          //   isDisabled: false, isEditable: false,
          //   dateResolved: new Date(), editColor: "transparent",
          //   imageAsData: branch.imageAsData,
          //   email: branch.email, 
          //   width: branch.width, 
          //   height: branch.height, 
          //   name: branch.name, 
          //   phone: branch.phone,
          // }

        }, function (error, result) {

          console.log("branches.update updateBranch callback error" + error)
        });


        /* Clear the controls */
        // for (var field in this.branchesForm.controls) {
        //   if (field != "_id") {
        //     (<Control>this.branchesForm.controls[field]).updateValue('');
        //     this.branchModelItem[field] = "";
        //   }
        // }

        // (<Control>this.branchesForm.controls['name']).updateValue('');
        // (<Control>this.branchesForm.controls['phone']).updateValue('');
        // (<Control>this.branchesForm.controls['imageAsData']).updateValue('');
        // (<Control>this.branchesForm.controls['email']).updateValue('');
        // this.branchModelItem.name = "";
        // this.branchModelItem.phone = "";
        // this.branchModelItem.imageAsData = null;
        // this.branchModelItem.email = "";

        this.hideDialog();
      } else {
        alert('Please log in to add a branch');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  deleteBranch(branch) {



    if (Meteor.userId()) {


      var o = new Object();
      o.time = new Date();
      o.type = this.action
      o.branch = branch;

      this.DeleteObjectEvent.emit(o)

    } else {
      alert('Please log in to add a branch');
    }

  }

  ImageChangedEvent(args) {

    var o = args;

    console.log(o.time)
    console.log(o.imageAsData)

    this.branchModelItem.imageAsData = o.imageAsData;
  }
  cancelBranch(branch) {

    if (Meteor.userId()) {

      // Reset everything...

      var self = this;
      Meteor.call('areas.get', function (error, result) {

        result.forEach(function (area) {
          self.areaItems.push(area)
          // console.dir(role)
        });

        var o = new Object();
        o.time = new Date();
        self.AreaItemsReadyEvent.emit(o)

      });

      this.hideDialog();


    } else {
      alert('Please log in to add a branch');
    }

  }

  hideDialog() {
    var o = new Object();
    o.time = new Date();
    o.type = this.action


    this.HideDialogEvent.emit(o)

  }
  removeRole(role) {


    // Remove role from branches list
    console.dir(this.branchModelItem.roles['default-group'])

    var array = this.branchModelItem.roles['default-group'];
    var index = array.indexOf(role, 0);
    if (index > -1) {
      array.splice(index, 1);
    }

    console.dir(this.branchModelItem.roles['default-group'])

    // Add role to dropdown list as now available again
    this.items.push(role)


  }
  newRole() {

    console.dir(this.branchModelItem.roles['default-group'])

    var array = this.branchModelItem.roles['default-group'];
    array.push('')

  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public dropDownAreaClick(area, index) {
    console.dir(area)

    this.branchModelItem.areaDescription = area.description;
    this.branchModelItem.areaId = area._id._str;

    // for (var i = 0; i < this.branchModelItem.roles['default-group'].length; i++) {

    //   if (i == index) {
    //     // console.log(this.branchModelItem.roles['default-group'][i] + " / " + origRole + " / " + newRole)
    //     this.branchModelItem.roles['default-group'][i] = newRole;
    //   }
    // }

    // // Remove new role from dropdown list, not available    var array = this.branchModelItem.roles['default-group'];
    // var dropDownindex = this.items.indexOf(newRole, 0);
    // if (dropDownindex > -1) {
    //   this.items.splice(dropDownindex, 1);
    //   this.items.push(origRole)
    // }

  }
}