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
import { ActivatedRoute, Router } from '@angular/router';


// Admir
import {MediaLibrariesForm} from '../../mediaLibraries/mediaLibraries-form/mediaLibraries-form.ts';
import {MediaLibrariesItem} from '../../mediaLibraries/mediaLibraries-item/mediaLibraries-item';
import {MediaLibraries} from '../../../imports/api/medialibraries';
import {Modal} from '../../directives/modal/modal';
import {AdmirMessagingBaseList} from '../../../client/baseList';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';

import template from './mediaLibraries-list.html';
@Component({
  selector: 'mediaLibraries-list',
  template,
  directives: [MediaLibrariesItem, MediaLibrariesForm, Modal, PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
})

export class MediaLibrariesList extends AdmirMessagingBaseList implements OnInit {
  @ViewChildren(MediaLibrariesItem) rolesList: QueryList<MediaLibrariesItem>;

  mediaLibraries: Mongo.Cursor<Object>;
  // helloEvent: EventEmitter = new EventEmitter();
  // public selfConnectionId: ReactiveVar<string> = new ReactiveVar<string>();
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  n: number = 0;
  data: any = new Object();
  action: string;
  private _customerId: number;
  private _channelId: number;
  sub: any;


  constructor(private route: ActivatedRoute) {
    super();


    this.sub = this.route.params.subscribe(params => {
      let customerId = +params['customerId']; // (+) converts string 'id' to a number
      let channelId = +params['channelId']; // (+) converts string 'id' to a number
      console.log("customerId: " + customerId);
      console.log("channelId: " + channelId);
      this._customerId = customerId;
      this._channelId = channelId;



      this.action = "add";
      let options = {
        limit: 100,
        skip: (this.curPage.get() - 1) * this.itemsPerPage,
        sort: { sortOrder: 1 },
        transform: function (item) {
          item.weekDays = LoadDays(item.days);
          item.dayTimes = LoadTimes(item.times);
          return item;
        }
      };

      this.subscribe('mediaLibraries', options, this.searchString.get(), this._customerId, this._channelId, () => {
        var self = this;

        console.log("running this.mediaLibraries= Meteor.mediaLibraries.find({});")
        // this.mediaLibraries = Meteor.mediaLibraries.remove({});
        var search = new RegExp('.*' + this.searchString.get(), 'i');
        this.mediaLibraries = MediaLibraries.find({ "$and": [{ "heading": search }, { "customerId": this._customerId }, { "channelId": this._channelId }] }, options);


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

      this.autorun(() => {
        this.totalItems = Counts.get('numberOfRecords');
        this.maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);
      }, true);
    });


    // Transfor allow for adding new computed field to the mongo cursor.



    function LoadDays(days: any) {


      var weekDays: Object =
        { Su: false, Mo: false, Tu: false, We: false, Th: false, Fr: false, Sa: false }

      for (var i in days) {

        if (days[i] == 0) {
          weekDays['Su'] = true
        }
        if (days[i] == 1) {
          weekDays['Mo'] = true
        }
        if (days[i] == 2) {
          weekDays['Tu'] = true
        }
        if (days[i] == 3) {
          weekDays['We'] = true
        }
        if (days[i] == 4) {
          weekDays['Th'] = true
        }
        if (days[i] == 5) {
          weekDays['Fr'] = true
        }
        if (days[i] == 6) {
          weekDays['Sa'] = true
        }

      }

      return weekDays;
    }

    function LoadTimes(times: any) {

      var iStr: string = null;

      var dayTimes: Object =
        { '01': false, '02': false, '03': false, '04': false, '05': false, '06': false, '07': false, '08': false, '09': false, '10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false }

      for (var i in times) {
        if (times[i] < 10) {
          iStr = "0" + times[i].toString();
        }
        else {
          iStr = times[i].toString();
        }
        dayTimes[iStr] = true;

      }

      // var str = JSON.stringify(times, null, 4);
      // alert(str);

      return dayTimes;
    }

    console.log("hello from mediaLibraries-list.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from mediaLibraries-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from mediaLibraries-list.ts");

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


