import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir


import template from './mediaLibraries-item2.html';
@Component({
  selector: 'media-libraries-item-2',
  template,
  directives: [],
  // properties: ['problem']
})
export class MediaLibrariesItem2 extends MeteorComponent implements OnInit {
  @Input() mediaLibraryModel;
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
    
    console.log("I'm being called when component is initalized after constructor method from MediaLibrariesItem2.ts");



  }

  public setMediaLibrary(mediaLibrary) {
    // mediaLibrary.editColor = "purple"
    mediaLibrary.editColor = "blue";
    // console.log("In setMediaLibrary")
    console.dir(mediaLibrary)
    this._element.style.background = "orange";

    console.dir(this._element)

    // this.roleModel.problem = mediaLibrary.problem;
    // alert(this.roleModel.problem + " / " + mediaLibrary.problem)

    // this.myThis.roleModel.editColor =    mediaLibrary.editColor  ;
    // this.roleModel.editColor = mediaLibrary.editColor;
  }

  /* */

  cancelMediaLibrary(mediaLibrary) {

    mediaLibrary.isEditable = false;
    mediaLibrary.problem = mediaLibrary.origProblem;
    mediaLibrary.response = mediaLibrary.origResponse;

    var self = this;
    Meteor.call('mediaLibraries.update', { _id: mediaLibrary._id }, { $set: { isDisabled: false, isEditable: mediaLibrary.isEditable, editColor: "transparent" } }, function (error, result) {
      // console.log("here" + mediaLibrary.selfConnectionId)
      mediaLibrary.isDisabled = false;
      mediaLibrary.editColor = "transparent";

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


      console.log("mediaLibraries.update editMediaLibrary callback")
    });

  }

  updateMediaLibrary(mediaLibrary) {
    console.dir(mediaLibrary)

    Meteor.call('mediaLibraries.update', { _id: mediaLibrary._id }, {
      $set: {
        isDisabled: false, isEditable: false, name: mediaLibrary.name,
        phone: mediaLibrary.phone, dateResolved: new Date(), editColor: "transparent",
        imageAsData: mediaLibrary.imageAsData, email: mediaLibrary.email, width: mediaLibrary.width, height: mediaLibrary.height

      }
    }, function (error, result) {
      // console.log("here")
      // console.dir(error)
      // console.dir(result)

      console.log("mediaLibraries.update updateMediaLibrary callback")
    });

  }

  deleteMediaLibrary(o) {

    Meteor.call('mediaLibraries.remove', { _id: o.mediaLibrary._id });
        this.hideDialog('delete')
  }

  editMediaLibrary(mediaLibrary) {

    mediaLibrary.isEditable = true;
    mediaLibrary.origProblem = mediaLibrary.problem;
    mediaLibrary.origResponse = mediaLibrary.response;

    var self = this;
    Meteor.call('mediaLibraries.update', { _id: mediaLibrary._id }, { $set: { isDisabled: true, isEditable: mediaLibrary.isEditable, editColor: "red" } }, function (error, result) {
      // console.log("here" + mediaLibrary.selfConnectionId)
      mediaLibrary.isDisabled = false;
      mediaLibrary.editColor = "transparent";

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


      console.log("mediaLibraries.update editMediaLibrary callback")
    });


  }

  runMediaLibrary(mediaLibrary) {

    alert(mediaLibrary._id);
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
