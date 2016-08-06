import 'reflect-metadata';
import 'zone.js/dist/zone';

// Meteor
import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {Mongo} from 'meteor/mongo';

// Angular
import {MeteorComponent} from 'angular2-meteor';
import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren, ContentChildren, QueryList} from '@angular/core';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';

// Admir
import {MediaLibrariesForm} from '../../mediaLibraries/mediaLibraries-form/mediaLibraries-form.ts';
import {MediaLibrariesItem2} from '../../mediaLibraries/mediaLibraries-item/mediaLibraries-item2';
import {MediaLibraries} from '../../../imports/api/medialibraries';
import {Modal} from '../../directives/modal/modal';
import {AdmirMessagingBaseList} from '../../../client/baseList';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';

import template from './mediaLibraries-list2.html';
@Component({
  selector: 'mediaLibraries-list2',
  templateUrl: '/imports/mediaLibraries/mediaLibraries-list/mediaLibraries-list2.html',
  directives: [MediaLibrariesItem2, MediaLibrariesForm, Modal, PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
})
export class MediaLibrariesList2 extends AdmirMessagingBaseList  implements OnInit {
  @ViewChildren(MediaLibrariesItem2) rolesList: QueryList<MediaLibrariesItem2>;

  mediaLibraries: Mongo.Cursor<Object>;
  // helloEvent: EventEmitter = new EventEmitter();
  // public selfConnectionId: ReactiveVar<string> = new ReactiveVar<string>();
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  n: number = 0;
  data: any = new Object();
  action: string;


  constructor() {
    super();



     this.action = "add";
     
    this.autorun(() => {
      let options = {
        limit: this.itemsPerPage,
        skip: (this.curPage.get() - 1) * this.itemsPerPage,
        sort: { sortOrder: 1 }
      };


      this.subscribe('mediaLibraries', options, this.searchString.get(), 2, () => {
        var self = this;

        console.log("running this.mediaLibraries= Meteor.mediaLibraries.find({});")
        // this.mediaLibraries = Meteor.mediaLibraries.remove({});
            var search = new RegExp('.*' + this.searchString.get(), 'i');
        this.mediaLibraries = MediaLibraries.find({ "$and": [{ "heading": search }, { "customerId": 2 }] }, options);


        // var handle = this.mediaLibraries.observeChanges({
        //   added: function (id) {
        //     console.log("subscribe Added: " + id)
        //     console.dir(id)


        //   },
        //   removed: function (id) {
        //     console.log("subscribe Removed: " + id)
        //   },
        //   changed: function (id, o) {
        //     console.log("subscribe Changed: " + id)
        //     console.dir(o)

        //     var genericRecord = o;
        //     if (genericRecord.editColor == 'red') {


        //     };

        //   },
        // });

        //  this.mediaLibraries = query;


      }, true);
    });


    this.autorun(() => {
      this.totalItems = Counts.get('numberOfRecords');
      this.maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);
    }, true);



    // this.action = "add";
    // this.helloEvent.subscribe((args) => {
    //   var self = this;

    //   // this.setMediaLibraries();
    //   console.log("hello from helloEvent")
    //   // console.dir(args)

    //   // this.rolesList.last.setMediaLibrary(args);


    //   // this.rolesList.toArray().forEach((list) => {
    //   //   this.setMediaLibrary(list);
    //   // });
    //   //        var j = 5.1;
    //   // (function (j,self) {
    //   //     setTimeout(() => {
    //   //          self.setMediaLibraries();
    //   //     }, 1000 * j);
    //   // })(j,self);



    // });

    console.log("hello from mediaLibraries-list2.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from mediaLibraries-list2.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from mediaLibraries-list2.ts");



  }


  setMediaLibrary(list) {
    console.log("in setMediaLibrary()")
    list.setMediaLibrary(list.roleModel);
  }


  setMediaLibraries() {

    //  let activeTabs = this.tabs.filter((tab)=>tab.active);
    // this.rolesList.first.setDiv();
    // this.rolesList.last.setDiv();

    // this.rolesList.toArray().forEach((list) => {
    //   this.setMediaLibrary(list);
    // });


    var b = new Object();
    this.helloEvent.emit(b)

  }

  showDialog(n, data) {
    this.display = true;
    // console.log(this.display);
    //     console.log(n);
    //     this.n = n;

    //             this.data = data;
    //                     console.dir(this.data);


  }
  hideDialog(e) {
    console.dir(e)
    this.display = false;
  }

}


