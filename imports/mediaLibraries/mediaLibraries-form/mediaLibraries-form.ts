import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES} from '@angular/common';

// Admir
// import {MediaLibraries} from '../../../imports/api/mediaLibraries';
// import {Modal} from '../directives/modal/modal';
import {TabView} from '../../directives/tabview/tabview';
import {TabPanel} from '../../directives/tabview/tabpanel';
// import {MediaLibrariesTab1} from '../../imports/mediaLibraries-form/mediaLibraries-tab1';
// import {MediaLibrariesTab2} from '../../imports/mediaLibraries-form/mediaLibraries-tab2';
import {ADMediaUpload} from '../../directives/mediaUpload/adMediaUpload';
// import {MediaLibrariesItem} from '../../imports/mediaLibraries-item/mediaLibraries-item';

import template from './mediaLibraries-form.html';
@Component({
  selector: 'media-libraries-form',
  template,
  directives: [TabView, TabPanel, FORM_DIRECTIVES, ADMediaUpload],
})
export class MediaLibrariesForm implements OnInit {
  @Input() mediaLibraryModelItem;
  @Input() action;
  mediaLibrarysForm: ControlGroup;
  @Output() HideDialogEvent: EventEmitter<any> = new EventEmitter();
  @Output() DeleteObjectEvent: EventEmitter<any> = new EventEmitter();
  n: number = 0;
  data: any;
  email: any;


  constructor() {

    // if (this.mediaLibraryModelItem == null){this.mediaLibraryModelItem = new Object()}
    let fb = new FormBuilder();

    this.mediaLibrarysForm = fb.group({
      imageAsData: ['', Validators.required],
      heading: ['', Validators.required],
      _id: '',
      detail: ['', Validators.minLength(3)],
      duration: [5, Validators.minLength(1)],
      days: [''],
      times: [''],
      createDate: [''],
      width: [''],
      height: [''],
      html: [''],





    });

  }

  ngOnInit() {

    console.dir(this.mediaLibraryModelItem);
    console.log("this.action")
    console.log(this.action)
  }

  ConvertWeekDays(weekDays: any) {

    var days = [];

    if (weekDays.Su == true) {
      days.push(0);
    }
    if (weekDays.Mo == true) {
      days.push(1);
    }
    if (weekDays.Tu == true) {
      days.push(2);
    }
    if (weekDays.We == true) {
      days.push(3);
    }
    if (weekDays.Th == true) {
      days.push(4);
    }
    if (weekDays.Fr == true) {
      days.push(5);
    }
    if (weekDays.Sa == true) {
      days.push(6);
    }


    return days;
  }
  ConvertDayTimes(dayTimes: any) {

    var times = [];
    var iStr: string = null;


    for (var i in dayTimes) {

      if (parseInt(i) < 10) {
        iStr = "0" + parseInt(i).toString();
      }
      else {
        iStr = parseInt(i).toString();
      }
      if (dayTimes[iStr] === true) {
        times.push(parseInt(i));
      }

      // dayTimes[iStr] === true ? times.push(dayTimes[i]);
    }

    // var str = JSON.stringify(dayTimes, null, 4);
    // alert(str);

    // if (dayTimes['01'] == true) {
    //    times.push(0);
    // }



    return times;
  }

  addMediaLibrary(mediaLibrary) {


    if (this.mediaLibrarysForm.valid) {
      if (Meteor.userId()) {

        mediaLibrary.html = '<img src="media/bird.png" width="100%" height="100%" />';
        mediaLibrary.programParameters = {};
        mediaLibrary.mediaLibrary = '/Html/Admir01.html';
        mediaLibrary.createDate = new Date();
        mediaLibrary.days = '0123456';
        mediaLibrary.times = '[0][1][2][3][4][5][6][7][8][9][10][11][12][13][14][15][16][17][18][19][20][21][22][23]';
        mediaLibrary.height = 90;
        mediaLibrary.width = 160;
        mediaLibrary.filepath = null;
        mediaLibrary.tags = 'Menu';
        mediaLibrary.sortOrder = 1;
        mediaLibrary.program = 'xxx.html';
        mediaLibrary.customerId = 2;
        mediaLibrary.mediaLibraryId = 1;


        Meteor.call('mediaLibraries.insert', mediaLibrary);

        /* Clear the controls */
        for (var field in this.mediaLibrarysForm.controls) {
          if (field != "_id") {
            (<Control>this.mediaLibrarysForm.controls[field]).updateValue('');
            this.mediaLibraryModelItem[field] = "";
          }
        }

        this.hideDialog();
      } else {
        alert('Please log in to add a mediaLibrary');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }


  updateMediaLibrary(mediaLibrary) {


    if (this.mediaLibrarysForm.valid) {
      if (Meteor.userId()) {

        /* Build up $set dynamically so we send all fields on the controls */
        var $set = {};

        for (var field in this.mediaLibrarysForm.controls) {
          if (field != "_id" && field != "days" && field != "times") {
            $set[field] = this.mediaLibrarysForm.controls[field].value;
          }
          if (field == "days") {
            // console.log("the value passed is")
            // console.dir(this.mediaLibraryModelItem.weekDays)
            //  console.dir(this.ConvertWeekDays(this.mediaLibraryModelItem.weekDays))
            $set[field] = this.ConvertWeekDays(this.mediaLibraryModelItem.weekDays);
          }
          if (field == "times") {
            console.log("the value passed is")
            console.dir(this.mediaLibraryModelItem.dayTimes)
            // console.dir(this.ConvertDayTimes(this.mediaLibraryModelItem.dayTimes))
            $set[field] = this.ConvertDayTimes(this.mediaLibraryModelItem.dayTimes);
          }
        }

        Meteor.call('mediaLibraries.update', { _id: mediaLibrary._id }, {

          $set: $set
          // Static way
          // $set: { 
          //   isDisabled: false, isEditable: false,
          //   dateResolved: new Date(), editColor: "transparent",
          //   imageAsData: mediaLibrary.imageAsData,
          //   email: mediaLibrary.email, 
          //   width: mediaLibrary.width, 
          //   height: mediaLibrary.height, 
          //   name: mediaLibrary.name, 
          //   phone: mediaLibrary.phone,
          // }

        }, function (error, result) {

          console.log("mediaLibraries.update updateMediaLibrary callback error" + error)
        });

        this.hideDialog();
      } else {
        alert('Please log in to add a mediaLibrary');
      }
    }
    else {
      alert('Please fill required fields');
    }
  }

  deleteMediaLibrary(mediaLibrary) {



    if (Meteor.userId()) {


      var o = new Object();
      o.time = new Date();
      o.type = this.action
      o.mediaLibrary = mediaLibrary;

      this.DeleteObjectEvent.emit(o)

    } else {
      alert('Please log in to add a mediaLibrary');
    }

  }

  ImageChangedEvent(args) {

    var o = args;

    console.log(o.time)
    console.log(o.imageAsData)

    this.mediaLibraryModelItem.imageAsData = o.imageAsData;
  }

  hideDialog() {
    var o = new Object();
    o.time = new Date();
    o.type = this.action

    this.HideDialogEvent.emit(o)

  }


}