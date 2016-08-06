import 'reflect-metadata';
import 'zone.js/dist/zone';

// Meteor
import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {Mongo} from 'meteor/mongo';

// Angular
import {MeteorComponent} from 'angular2-meteor';
import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren, ContentChildren, QueryList, NgZone} from '@angular/core';
import {FormBuilder, ControlGroup, Validators, Control} from '@angular/common';

// Admir
import {AreasForm} from '../../areas/areas-form/areas-form.ts';
import {AreasItem} from '../../areas/areas-item/areas-item.ts';
import {Areas}    from '../../../imports/api/areas';
import {Branches} from '../../../imports/api/branches';
import {Modal} from '../../directives/modal/modal';
import {AdmirMessagingBaseList} from '../../../client/baseList';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Counts} from 'meteor/tmeasday:publish-counts';



import template from './areas-list.html';
@Component({
  selector: 'areas-list',
  template,
  directives: [AreasItem, AreasForm, Modal, PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
})
export class AreasList extends AdmirMessagingBaseList implements OnInit {
  @ViewChildren(AreasItem) areasList: QueryList<AreasItem>;

  areas: Mongo.Cursor<Object>;
  branches: Mongo.Cursor<Object>;
  // helloEvent: EventEmitter = new EventEmitter();
  // public selfConnectionId: ReactiveVar<string> = new ReactiveVar<string>();
  @Output() helloEvent: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  n: number = 0;
  data: any = new Object();
  action: string;

  private branchesList: any = [];

  constructor(private zone: NgZone) {
    super();

    this.branchesList = [];

    function xxxx() {

      return
    }

    this.autorun(() => {
      let options = {
        limit: this.itemsPerPage,
        skip: (this.curPage.get() - 1) * this.itemsPerPage,
        sort: { description: 1 },
        kjb: 'kjb',
        transform: function (item) {
          item.xyz = "abc";
          return item;
        },
      }
      var self = this;
      this.subscribe('branches', options, this.searchString.get(), () => {

        var query = Branches.find({});
        this.branches = query;

        query.forEach(function (branch) {
          self.branchesList.push(branch);

        });

        console.log("self.branchesList");
        console.dir(self.branchesList);

      }, true);



      this.subscribe('areas', options, this.searchString.get(), () => {
        // var self = this;

        var query = Areas.find({}, {
          transform: function (doc) {
            doc.branches = (function () {

              var ret = self.branchesList;
              var areaBranches = [];
              ret.forEach(function (branch) {
                // console.log("branch: " + branch.areaId + " / " + doc._id);
                // console.dir(branch);
                if (branch.areaId == doc._id) {
                  areaBranches.push(branch);
                }

              });
              return areaBranches;
            })();
            doc.times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
            return doc;
          }
        });
        query.forEach(function (area) {
          // area.branches = []

          console.log("area");
          console.dir(area);
          // console.log(area.kjb())
          // console.log(area.branches2)

          // Meteor.call('branches.getByAreaId', area._id._str, function (error, result) {
          //   area.branches = result;
          //   console.log("branches.getByAreaId'callback OK 1: " + result.length)
          // });


          // var tempBranches = Branches.find({ areaId: "fb6b0eff47736e321c6b1666" }).fetch();
          //           var tempBranches = Branches.find({}).fetch();
          // console.log("tempBranches");
          // console.dir(tempBranches);

          // tempBranches.forEach(function (branch) {
          //   area.branches.push(branch)

          //   console.log("branch");
          //   console.dir(branch);

          // });
        });

        // var query = tempAreas;

        var handle = query.observeChanges({
          added: function (id, o) {
            console.log("subscribe Added: " + id)
            // console.dir(id)
            // console.dir(o)
            // Meteor.call('branches.getByAreaId', "fb6b0eff47736e321c6b1666", function (error, result) {
            //   o.branches = [];
            //   result.forEach(function (branch) {
            //     o.branches.push(branch);
            //   });

            //   console.log("branches.getByAreaId'callback OK 3: " + result.length)
            //   console.dir(o);
            // });

          },
          removed: function (id) {
            console.log("subscribe Removed: " + id)
          },
          changed: function (id, o) {
            console.log("subscribe Changed: " + id)
            console.dir(o)

            var genericRecord = o;
            if (genericRecord.editColor == 'red') {


            };

          },
        });



        this.areas = query;
        // zone.run(() => {

        // });
        console.log("this.areas");
        console.dir(this.areas.fetch());

        // setTimeout(() => {

        // }, 5000);


      }, true);
    });


    this.autorun(() => {
      this.totalItems = Counts.get('numberOfRecords');
      this.maxPagesCalc = Math.ceil(this.totalItems / this.itemsPerPage);
    }, true);



    this.action = "add";
    this.helloEvent.subscribe((args) => {
      var self = this;

      // this.setAreas();
      console.log("hello from helloEvent")
      // console.dir(args)

      // this.areasList.last.setArea(args);


      // this.areasList.toArray().forEach((list) => {
      //   this.setArea(list);
      // });
      //        var j = 5.1;
      // (function (j,self) {
      //     setTimeout(() => {
      //          self.setAreas();
      //     }, 1000 * j);
      // })(j,self);



    });

    console.log("hello from areas-list.ts")
    // this.selfConnectionId.set("Test1 !!!")


    console.log("hello from areas-list.ts")
  }

  ngOnInit() {

    console.log("I'm being called when component is initalized after constructor method from areas-list.ts");





  }

  setArea(list) {
    console.log("in setArea()")
    list.setArea(list.areaModel);
  }


  setAreas() {

    //  let activeTabs = this.tabs.filter((tab)=>tab.active);
    // this.areasList.first.setDiv();
    // this.areasList.last.setDiv();

    // this.areasList.toArray().forEach((list) => {
    //   this.setArea(list);
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


