import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir


import {AreasForm} from '../../../imports/areas/areas-form/areas-form';
// import {AreasFormModal} from '../../../imports/areas/areas-form/areas-formModal';
import {Modal} from '../../directives/modal/modal';
import {Modal2} from '../../directives/modal/modal2';
import {ModalAdmir} from '../../directives/modal/modalAdmir';

import template from './areas-item.html';
@Component({
  selector: 'areas-item',
  template,
  directives: [AreasForm, Modal, Modal2,ModalAdmir],
  // properties: ['problem']
})
export class AreasItem extends MeteorComponent implements OnInit {
  @ViewChild(AreasForm) areasForm: AreasForm;
  // @ViewChild(AreasFormModal) areasForm: AreasFormModal;
  @Input() areaModel;
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

  public setArea(area) {
    // area.editColor = "purple"
    area.editColor = "blue";
    // console.log("In setArea")
    console.dir(area)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.areaModel.problem = area.problem;
    // alert(this.areaModel.problem + " / " + area.problem)

    // this.myThis.areaModel.editColor =    area.editColor  ;
    // this.areaModel.editColor = area.editColor;
  }

  /* */

  cancelArea(area) {

    area.isEditable = false;
    area.problem = area.origProblem;
    area.response = area.origResponse;

    var self = this;
    Meteor.call('areas.update', { _id: area._id }, { $set: { isDisabled: false, isEditable: area.isEditable, editColor: "transparent" } }, function (error, result) {
      // console.log("here" + area.selfConnectionId)
      area.isDisabled = false;
      area.editColor = "transparent";

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


      console.log("areas.update editArea callback")
    });

  }

  updateArea(area) {
    console.dir(area)

    Meteor.call('areas.update', { _id: area._id }, {
      $set: {
        isDisabled: false, isEditable: false, name: area.name,
        phone: area.phone, dateResolved: new Date(), editColor: "transparent",
        imageAsData: area.imageAsData, email: area.email, width: area.width, height: area.height

      }
    }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("areas.update updateArea callback")
    });

  }

  deleteArea(o) {

    Meteor.call('areas.remove', { _id: o.area._id });
        this.hideDialog('delete')
  }

  editArea(area) {

    area.isEditable = true;
    area.origProblem = area.problem;
    area.origResponse = area.response;

    var self = this;
    Meteor.call('areas.update', { _id: area._id }, { $set: { isDisabled: true, isEditable: area.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + area.selfConnectionId)
      area.isDisabled = false;
      area.editColor = "transparent";

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


      console.log("areas.update editArea callback")
    });


  }

  runArea(area) {

    alert(area._id);
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
