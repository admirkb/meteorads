// Meteor

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, SimpleChange, OnChanges, Input, EventEmitter, NgZone} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {adProgramViewSchedule} from '../../imports/directives/adProgramViewSchedule/adProgramViewSchedule';
import {MediaLibraries} from '../../imports/api/medialibraries';
import {Observable} from 'rxjs/Observable';

import template from './scratchView.html';
@Component({
  directives: [adProgramViewSchedule],
  template
})
export class ScratchView extends MeteorComponent implements OnChanges {
  roles: Mongo.Cursor<Object>;
  admirArrayList: AdmirArrayList;
  @Input() isReady;
  MediaLibrariesChanged: EventEmitter<any> = new EventEmitter();

  public items: Array<Object> = [{ name: 'The first choice!' },
    { name: 'And another choice for you.' }, { name: 'but wait! A third!' }];


  constructor(private zone: NgZone) {
    super();


    this.admirArrayList = new AdmirArrayList(zone);
    this.admirArrayList.Add('Freddy 1');
    this.isReady = false;



    this.MediaLibrariesChanged.subscribe((args) => {
      console.log("MediaLibrariesChanged fired")
      console.dir(args.ret)
      this.admirArrayList.Add('Freddy 2');



      // zone.runOutsideAngular(() => {
      //   setInterval(() => {
      //     this.admirArrayList.Add('Freddy 2.2');


      //     // lc.tick(); // comment this line and time will stop updating
      //   }, 1000);
      // })

      // gZone.run();
      // this.Add('Jimmy this.MediaLibrariesChanged.subscrib');



      args.ret.forEach((medialib) => {
        // console.dir(medialib);
        var ml = new Object();
        ml.id = medialib._id;
        ml.customerId = medialib.customerId;
        ml.channelId = medialib.channelId;
        //ml._id._str = o._id._str;
        ml.program = medialib.program;
        ml.heading = medialib.heading;
        ml.detail = medialib.detail;
        ml.duration = medialib.duration;
        ml.sortOrder = medialib.sortOrder;
        ml.times = medialib.times;
        ml.days = medialib.days;
        ml.html = medialib.html;
        // this.mediaLibrariesList.push(ml);
        this.Add(medialib._id);
        this.admirArrayList.Add(medialib._id);





        console.log("forEach ~ " + ml.id);
      });

      zone.run(() => { // Change the property within the zone, CD will run after
        // this.admirArrayList.Add('Freddy 2.4');
      });


    });

    // setTimeout(() => {

    //   this.admirArrayList.Add('Freddy 3');
    // }, 100);

    // setTimeout(() => {

    //   this.admirArrayList.Add('Freddy 3.1');
    // }, 1000);


    let options = {
      sort: { 'sortOrder': 1 }
    };
    var handle = Meteor.subscribe("mediaLibraries2", options, 2, 2, {
      onReady: () => {
        console.log("onReady And the Items(mediaLibraries) actually Arrive");
        // console.log(this.searchCustomerId.get());
        // console.log(this.searchChannelId.get());


        var ret = MediaLibraries.find({ "$and": [{ "customerId": 2 }, { "channelId": 2 }] }, options).fetch();


        ret.forEach((medialib) => {
          // console.dir(medialib);
          var ml = new Object();
          ml.id = medialib._id;
          ml.customerId = medialib.customerId;
          ml.channelId = medialib.channelId;
          //ml._id._str = o._id._str;
          ml.program = medialib.program;
          ml.heading = medialib.heading;
          ml.detail = medialib.detail;
          ml.duration = medialib.duration;
          ml.sortOrder = medialib.sortOrder;
          ml.times = medialib.times;
          ml.days = medialib.days;
          ml.html = medialib.html;
          // this.mediaLibrariesList.push(ml);
          // this.Add(medialib._id);

          // this.admirArrayList.Add(medialib._id);

        zone.run(() => { // Change the property within the zone, CD will run after
          this.admirArrayList.Add('Freddy 2.4');
          this.admirArrayList.Add(medialib._id);
        });



          console.log("forEach ~ " + ml.id);
        });

        // zone.run(() => { // Change the property within the zone, CD will run after
        //   // this.admirArrayList.Add('Freddy 2.4');
        // });

        // var b = new Object();
        // b.time = new Date();
        // b.ret = ret;
        // this.MediaLibrariesChanged.emit(b)

        // this.initialLoad = true;
        // if (this.mediaLibrariesList.length != 0) {

        //     setTimeout(() => {
        //         this.setTimes(this.mediaLibrariesList);
        //     }, 1000);

        // }

      },
      onStop: () => {

        console.log("onError");
      }


    });

    this.isReady = true;
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    console.log("ngOnChanges called")
    for (let propName in changes) {

      if (propName == 'isReady') {

        let chng = changes[propName];

        let cur = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);

        if (cur != prev) {
          console.log("propName == 'isReady changed'")
          console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);


        }


      }



    }


  }

  Add(id) {
    this.admirArrayList.Add('Freddy 3: ' + id);

  }
}

declare const global;
export const g =
  typeof global === 'object' ? global :
    typeof window === 'object' ? window :
      typeof self === 'object' ? self : this;

export const gZone = g.Zone.current;


class AdmirArrayList {


  public items: Array<Object> = [{ name: 'The first choice!' },
    { name: 'And another choice for you.' }, { name: 'but wait! A third!' }];

  constructor(private zone: NgZone) {

    console.log("In constructor of AdmirArrayList")
    console.dir(this.items);
  }

  Add(name) {


    var item: Object = <Object>{
      name: name,
    };

    this.items.push(item);
    // gZone.run();
  }

}