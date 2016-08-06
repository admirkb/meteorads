import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir


import {BranchesForm} from '../../../imports/branches/branches-form/branches-form';
// import {BranchesFormModal} from '../../imports/branches-form/branches-formModal';
import {Modal} from '../../directives/modal/modal';
import {Modal2} from '../../directives/modal/modal2';
import {ModalAdmir} from '../../directives/modal/modalAdmir';

import template from './branches-item.html';
@Component({
  selector: 'branches-item',
  template,
  directives: [BranchesForm, Modal, Modal2,ModalAdmir],
  // properties: ['problem']
})
export class BranchesItem extends MeteorComponent implements OnInit {
  @ViewChild(BranchesForm) branchesForm: BranchesForm;
  @Input() brancheModel;
  @Input() theIndex;
  private _element: any;
  display: boolean = false;
  displayDeleteModal: boolean = false;
  admirShowValue: boolean = false;
  action: string;

  constructor(elementRef: ElementRef) {
    super();

    this.action = "update";
    this._element = elementRef.nativeElement;


  }


  ngOnInit() {

    // console.log(this._element.outerHTML)

  }

  public setBranche(branch) {
    // branch.editColor = "purple"
    branch.editColor = "blue";
    // console.log("In setBranche")
    console.dir(branch)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.brancheModel.problem = branch.problem;
    // alert(this.brancheModel.problem + " / " + branch.problem)

    // this.myThis.brancheModel.editColor =    branch.editColor  ;
    // this.brancheModel.editColor = branch.editColor;
  }

  /* */

  cancelBranch(branch) {

    branch.isEditable = false;
    branch.problem = branch.origProblem;
    branch.response = branch.origResponse;

    var self = this;
    Meteor.call('branches.update', { _id: branch._id }, { $set: { isDisabled: false, isEditable: branch.isEditable, editColor: "transparent" } }, function (error, result) {
      // console.log("here" + branch.selfConnectionId)
      branch.isDisabled = false;
      branch.editColor = "transparent";

      var cells = self._element.getElementsByTagName("td");
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "black";


        var inputs = cells[i].getElementsByTagName("input");
        for (var j = 0; j < inputs.length; j++) {
          if (inputs[j] != null) {
            inputs[j].disabled = false;
          }
        }

        var buttons = cells[i].getElementsByTagName("button");
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].disabled = false;
        }
        console.dir(inputs)
        // console.dir(cells[i].children)
      }


      console.log("branches.update editBranch callback")
    });

  }

  updateBranch(branch) {
    console.dir(branch)

    Meteor.call('branches.update', { _id: branch._id }, {
      $set: {
        isDisabled: false, isEditable: false, 
        editColor: "transparent",
        imageAsData: branch.imageAsData, address: branch.address, width: branch.width, height: branch.height

      }
    }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("branches.update updateBranch callback")
    });

  }

  deleteBranch(o) {

    Meteor.call('branches.remove', { _id: o.branch._id });
        this.hideDialog('delete')
  }

  editBranch(branch) {

    branch.isEditable = true;
    branch.origProblem = branch.problem;
    branch.origResponse = branch.response;

    var self = this;
    Meteor.call('branches.update', { _id: branch._id }, { $set: { isDisabled: true, isEditable: branch.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + branch.selfConnectionId)
      branch.isDisabled = false;
      branch.editColor = "transparent";

      var cells = self._element.getElementsByTagName("td");
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "black";


        var inputs = cells[i].getElementsByTagName("input");
        for (var j = 0; j < inputs.length; j++) {
          if (inputs[j] != null) {
            inputs[j].disabled = false;
          }
        }

        var buttons = cells[i].getElementsByTagName("button");
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].disabled = false;
        }
        console.dir(inputs)
        // console.dir(cells[i].children)
      }


      console.log("branches.update editBranch callback")
    });


  }

  runBranch(branch) {

    alert(branch._id);
  }

  doModal(ev) {

    console.dir(ev);
    var button = ev.relatedTarget;
    console.dir(button)
    //     var self = this;
    // // var cells =  self._element.getElementsByTagName("td");

    // var cells =  self._element.getElementsByTagName("td");

    // console.dir(cells)
    // // t.attr('data-target','#myModal1');

    // console.dir(this._element)
    // this._element.style.background = "orange";
    // var modal = this._element.getElementById('myModal1');
    // console.log(modal)
    // onclick="$($(this).data('myModal1')).modal('show');"
    //  this._element.getElementById('myModal1').modal('show');

    // $('#testButton').attr('data-target','#testModal2');
  }

  xxxxShow() {
   console.log(this.admirShowValue);
   this.admirShowValue = true;
   console.log(this.admirShowValue);
  }
  
  xxxxHide() {
   console.log(this.admirShowValue);
   this.admirShowValue = false;
   console.log(this.admirShowValue);
  }
    
  showDialog(type) {

    if (type == 'add' || type == 'update') {
      this.display = true;
    }
    else {
      this.displayDeleteModal = true;
    }

    // console.log(this.display);
    //     console.log(n);
    //     this.n = n;

    //             this.data = data;
    //                     console.dir(this.data);


  }

  hideDialog(e) {
    console.dir(e)
    // this.display = false;
    //     this.displayDeleteModal = false;

    if (e.type == 'add' || e.type == 'update') {
      this.display = false;
    }
    else {
      this.displayDeleteModal = false;
    }
  }
}
