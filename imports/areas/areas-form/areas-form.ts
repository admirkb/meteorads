import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES} from '@angular/common';

// Admir
import {Areas} from '../../../imports/api/areas';
// import {Modal} from '../directives/modal/modal';
import {TabView} from '../../directives/tabview/tabview';
import {TabPanel} from '../../directives/tabview/tabpanel';
// import {AreasTab1} from '../../imports/areas-form/areas-tab1';
// import {AreasTab2} from '../../imports/areas-form/areas-tab2';
import {ADMediaUpload} from '../../directives/mediaUpload/adMediaUpload';
// import {AreasItem} from '../../imports/areas-item/areas-item';

import template from './areas-form.html';
@Component({
  selector: 'areas-form',
  template,
  directives: [TabView, TabPanel, FORM_DIRECTIVES, ADMediaUpload],
})
export class AreasForm implements OnInit {
  @Input() areaModelItem;
  @Input() action;
  areasForm: ControlGroup;
  @Output() HideDialogEvent: EventEmitter<any> = new EventEmitter();
  @Output() DeleteObjectEvent: EventEmitter<any> = new EventEmitter();
  n: number = 0;
  data: any;
  email: any;


  constructor() {

    // if (this.areaModelItem == null){this.areaModelItem = new Object()}
    let fb = new FormBuilder();

    this.areasForm = fb.group({
      description: ['', Validators.required],
      imageAsData: ['', Validators.required],
      _id: '',
      width: [320, Validators.minLength(3)],
      height: [180, Validators.minLength(3)],

    });

    // this.email = this.areasForm.controls['email'];
    // this.email.valueChanges.subscribe(
    //   (value: string) => {
    //     console.log('email changed to:', value);
    //   }
    // );
    // console.log("areaModelItem");
    // console.dir(this.areaModelItem);


  }

  ngOnInit() {

    // console.dir(this.areaModelItem);
    // console.log("this.action")
    // console.log(this.action)
  }

  addArea(area) {


    if (this.areasForm.valid) {
      if (Meteor.userId()) {

        Meteor.call('areas.insert', area);

        /* Clear the controls */
        for (var field in this.areasForm.controls) {
          if (field != "_id") {
            (<Control>this.areasForm.controls[field]).updateValue('');
            this.areaModelItem[field] = "";
          }
        }

        this.hideDialog();
      } else {
        alert('Please log in to add a area');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  updateArea(area) {


    if (this.areasForm.valid) {
      if (Meteor.userId()) {

        // console.dir(area)
        // console.log("area._id")
        // console.log(area._id)
        // console.log(this.areasForm.value);
        // console.dir(this.areasForm.controls);

        /* Build up $set dynamically so we send all fields on the controls */
        var $set = {};

        for (var field in this.areasForm.controls) {
          if (field != "_id") {
            $set[field] = this.areasForm.controls[field].value;
          }
        }
        $set['isDisabled'] = false;
        $set['isEditable'] = false;
        $set['editColor'] = 'transparent';
        $set['dateResolved'] = new Date();

        Meteor.call('areas.update', { _id: area._id }, {

          $set: $set
          // Static way
          // $set: { 
          //   isDisabled: false, isEditable: false,
          //   dateResolved: new Date(), editColor: "transparent",
          //   imageAsData: area.imageAsData,
          //   email: area.email, 
          //   width: area.width, 
          //   height: area.height, 
          //   name: area.name, 
          //   phone: area.phone,
          // }

        }, function (error, result) {

          console.log("areas.update updateArea callback error" + error)
        });


        /* Clear the controls */
        // for (var field in this.areasForm.controls) {
        //   if (field != "_id") {
        //     (<Control>this.areasForm.controls[field]).updateValue('');
        //     this.areaModelItem[field] = "";
        //   }
        // }

        // (<Control>this.areasForm.controls['name']).updateValue('');
        // (<Control>this.areasForm.controls['phone']).updateValue('');
        // (<Control>this.areasForm.controls['imageAsData']).updateValue('');
        // (<Control>this.areasForm.controls['email']).updateValue('');
        // this.areaModelItem.name = "";
        // this.areaModelItem.phone = "";
        // this.areaModelItem.imageAsData = null;
        // this.areaModelItem.email = "";

        this.hideDialog();
      } else {
        alert('Please log in to add a area');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  deleteArea(area) {



    if (Meteor.userId()) {


      var o = new Object();
      o.time = new Date();
      o.type = this.action
      o.area = area;

      this.DeleteObjectEvent.emit(o)

    } else {
      alert('Please log in to add a area');
    }

  }

  ImageChangedEvent(args) {

    var o = args;

    console.log(o.time)
    console.log(o.imageAsData)

    this.areaModelItem.imageAsData = o.imageAsData;
  }

  hideDialog() {
    var o = new Object();
    o.time = new Date();
    o.type = this.action

    this.HideDialogEvent.emit(o)

  }


}