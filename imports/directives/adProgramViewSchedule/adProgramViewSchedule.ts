import 'reflect-metadata';
import 'zone.js/dist/zone';

// Meteor
import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {Mongo} from 'meteor/mongo';

// angular
import {Component, ElementRef, EventEmitter, Output, OnInit, AfterViewInit, Input, NgZone, ViewChild, OnChanges, SimpleChange, OnDestroy} from '@angular/core';

// Admir
import {MediaLibraries} from '../../../imports/api/medialibraries';
import {adProgramViewScheduleItem} from '../../../imports/directives/adProgramViewSchedule/adProgramViewScheduleItem';

import {Counts} from 'meteor/tmeasday:publish-counts';
import {thisBranch} from '../../../imports/api/constants';

@Component({
    selector: 'ad-program-view-schedule',
    directives: [adProgramViewScheduleItem],
    template: `

<div  [ngStyle]="{width: width, height: height , minWidth:width , minHeight:height}"  style="position:relative;background-color:transparent; border-width:0px;border-style:solid; border-color:transparent;">


    <div style="width:100%; height:100%;background-color:transparent; border-width:0px;border-style:solid; border-color:transparent;text-align:center;">
        <div class="container">
            <div [ngStyle]="{width: width, height: height , minWidth:width , minHeight:height}"  style="vertical-align:top;border-width:0px;border-style:solid; border-color:white; position: relative;  margin: auto; padding:0px;"
            *ngFor="let o of mediaLibrariesList; let key = index">


                        <div style="background-color:transparent;" *ngIf="key==0" [ngStyle]="{width: width, height: height , minWidth:width , minHeight:height}" >
                            <ad-program-view-schedule-item [muted]="muted"  [width]="width"  [height]="height" [playingId]="playingId" [playing]="o.playing" [theHtml]="o.html" [thedata]="o" [theId]="o.id"
                                [key]="key" type="static"></ad-program-view-schedule-item>
                        </div>




        </div>
        </div>
    </div>

</div>
<div style="width:inherit; height:inherit;position:relative;top:0px; left:0px; background-color:transparent; border-width:0px;border-style:none"
    *ngIf="showListing">
    <table style="position:relative;top:0px; left:0px;width:100%; height:10%; max-height:60px; white-space:nowrap;color:black;background-color:white;font-size:12px; opacity:.75;">
        <tr>
            <th style="text-align:left;">Id</th>
            <th style="text-align:left;">Time</th>
            <!--<th style="text-align:left;">Key</th>-->
        </tr>
        <tr>
        </tr>
        <tr *ngFor="let o of RunAtArray; let key = index">
            <td style="width:20px;">
                {{o.ID}}
            </td>
            <td style="width:20px;">
                {{o.ProgramTime}}
            </td>
            <!--<td style="width:20px;">
                    {{key}}
                </td>-->
        </tr>
    </table>

    <button (click)="changeMuteState()">Sound</button>
    <!--<div style="color:yellow;" [innerHTML]="playingId"></div>-->
    <!--<div style="color:yellow;" [innerHTML]="'Admir customer # ' + customerId"></div>-->
    <!--<div style="color:yellow;" [innerHTML]="'Admir channel # ' + channelId"></div>-->
    <div style="width:100%; height:100%; vertical-align:top;border-width:0px;border-style:solid; border-color:white; margin:0px; padding:0px;"
        *ngFor="let o of mediaLibrariesList; let key = index">
        <table style="overflow:hidden; vertical-align:top;width:100%;background:transparent; color:white;">
            <tr *ngIf="key==0">
                <th style="text-align:left;">Heading</th>
                <th style="text-align:left;">Details</th>
                <th style="text-align:left;text-align:right">Duration</th>
            </tr>
            <tr>
                <td style="width:30%; vertical-align:top;">
                    <div [innerHTML]="o.heading"></div>
                </td>
                <td style="width:60%; vertical-align:top;">
                    <div [innerHTML]="o.detail"></div>
                </td>
                <td style="width:10%; vertical-align:top;text-align:right">
                    <div [innerHTML]="o.DDHHMMSS"></div>
                </td>
            </tr>
        </table>
    </div>
</div>

    `,
})
export class adProgramViewSchedule implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @ViewChild(adProgramViewScheduleItem) adProgramViewScheduleItem: adProgramViewScheduleItem;
    private showTime: boolean = true;
    private showSignage: boolean = true;
    private initialLoad: boolean = false;
    private search: any;
    private mediaLibraries: Mongo.Cursor<Object>;
    private mediaLibrariesList: any = [];
    private RunAtArray: any = [];
    private xxxx: any = [];
    protected searchCustomerId: ReactiveVar<number> = new ReactiveVar<number>(-1);
    protected searchChannelId: ReactiveVar<number> = new ReactiveVar<number>(-1);

    protected playingId: string;
    private totalItems: number;
    @Input() customerId: number;
    @Input() channelId: number;
    @Input() width: string;
    @Input() height: string;
    @Input() muted: boolean = false;
    @Input() allMuted: boolean = false;
    @Input() showListing: boolean;
    // Events
    MediaLibrariesChanged: EventEmitter<any> = new EventEmitter();
    MediaLibrariesChangedHtml: EventEmitter<any> = new EventEmitter();
    MediaLibrariesRemoved: EventEmitter<any> = new EventEmitter();
    MediaLibrariesAdded: EventEmitter<any> = new EventEmitter();


    constructor(private zone: NgZone) {
        this.muted = false;

        // this.showListing = false;

        // setInterval(() => {
        //     this.setTimesxxxx();
        // }, 1000);


        this.mediaLibrariesList = [];
        this.RunAtArray = [];


        // Event  handlers
        function formatTime(duration: number) {

            var h1 = Math.floor(duration / (60 * 60));
            duration %= 60 * 60;
            var m1 = Math.floor(duration / 60);
            duration %= 60;
            var h2 = h1 ? h1 + ':' : '',
                m2 = h1 && m1 < 10 ? '0' + m1 : m1,
                s2 = duration < 10 ? '0' + duration : duration;
            return h2 + m2 + ':' + s2;
        }
        this.MediaLibrariesChanged.subscribe((args) => {

            console.log("MediaLibrariesChanged fired: " + args.id._str)

            var index = -1;
            this.mediaLibrariesList.forEach((medialib) => {
                index++;
                if (medialib.id == args.id._str) {
                    medialib.duration = args.o.duration;
                    medialib.DDHHMMSS = formatTime(medialib.duration);
                    medialib.sortOrder = index;
                    console.log("found: " + medialib.DDHHMMSS);

                    // If index is zero must be playing now so adjust the timeout
                    if (index == 0) {
                        this.extendTime();
                    }
                    // this.zone.run(() => {
                    //     this.someProperty = Math.random();
                    // });
                }

            });


            console.dir(this.RunAtArray)

            zone.run(() => { // Change the property within the zone, CD will run after

            });

        });
        this.MediaLibrariesChangedHtml.subscribe((args) => {
            console.log("MediaLibrariesChangedHtml fired")
        });
        this.MediaLibrariesRemoved.subscribe((args) => {
            console.log("MediaLibrariesRemoved fired")
            var index = -1;
            var medlibToDeleteIndex = -1;
            this.mediaLibrariesList.forEach((medialib) => {
                index++;

                if (medialib.id == args.id._str) {
                    medlibToDeleteIndex = index;

                    if (index == 0) {
                        this.killTime();
                    }
                }

            });
            console.log("MediaLibrariesRemoved fired:" + medlibToDeleteIndex)
            if (medlibToDeleteIndex != -1) {
                this.mediaLibrariesList.splice(medlibToDeleteIndex, 1)
                zone.run(() => { // Change the property within the zone, CD will run after

                });
            }



        });
        this.MediaLibrariesAdded.subscribe((args) => {
            console.log("MediaLibrariesAdded fired")
            this.mediaLibrariesList.push(args.o);


            zone.run(() => { // Change the property within the zone, CD will run after

            });

        });





    }


    ngOnInit() {
        console.log("ngOnInit being called when component is initalized after constructor method from adProgramViewSchedule.ts");

        console.log("this.showListing")
        console.log(this.showListing)




        var day = new Date().getDay().toString();
        var hours = new Date().getHours().toString();


        // this.customerId = 2;
        // this.channelId = 2;

        // this.searchCustomerId.set(this.customerId);
        // this.searchChannelId.set(this.channelId);


        Tracker.autorun(() => {


            this.search = [];
            this.mediaLibrariesList = [];
            this.initialLoad = false;

            let options = {
                sort: { 'sortOrder': 1 }
            };
            var handle = Meteor.subscribe("mediaLibraries2", options, this.searchCustomerId.get(), this.searchChannelId.get(), {
                onReady: () => {
                    console.log("onReady And the Items(mediaLibraries) actually Arrive");
                    // console.log(this.searchCustomerId.get());
                    // console.log(this.searchChannelId.get());

                    // var query = MediaLibraries.find({ "$and": [{ "customerId": this.customerId }, { "channelId": this.channelId }] }, options);

var query = MediaLibraries.find( {
    $or : [
	{ $and : [{ "customerId": this.customerId}, { "channelId": this.channelId}, { atBranches: { $exists: false} } ] },
	{ $and : [{ "customerId": this.customerId}, { "channelId": this.channelId}, { atBranches: { $in: [thisBranch]} } ] }
    ]
} , options)





//  var query = MediaLibraries.find( {
//     $or : [
// 	{ $and : [{ "customerId": this.customerId}, { "channelId": this.channelId}, { days: { $in: this.dayOfWeek} }, { times: { $in: this.hourOfDay} }, { atBranches: { $exists: false} }] },
// 	{ $and : [{ "customerId": this.customerId}, { "channelId": this.channelId}, { days: { $in: this.dayOfWeek} }, { times: { $in: this.hourOfDay} }, { atBranches: { $in: [1]} }] }
//     ]
// } )


                    this.totalItems = Counts.get('numberOfRecords');
                    console.log("Total items: " + this.totalItems);

                    // query.forEach((medialib) => {
                    //     // console.dir(medialib);

                    //     var ml = new Object();
                    //     ml.id = medialib._id;
                    //     ml.customerId = medialib.customerId;
                    //     ml.channelId = medialib.channelId;
                    //     //ml._id._str = o._id._str;
                    //     ml.program = medialib.program;
                    //     ml.heading = medialib.heading;
                    //     ml.detail = medialib.detail;
                    //     ml.duration = medialib.duration;
                    //     ml.DDHHMMSS = formatTime(medialib.duration);
                    //     ml.sortOrder = medialib.sortOrder;
                    //     ml.times = medialib.times;
                    //     ml.days = medialib.days;
                    //     ml.html = medialib.html;
                    //     this.mediaLibrariesList.push(ml);
                    //     console.log("forEach ~ " + ml.id);
                    // });

                    query.observeChanges({
                        added: (id, o) => {
                            o.DDHHMMSS = formatTime(o.duration);
                            o.id = id;
                            var b = new Object();
                            b.time = new Date();
                            b.id = id;
                            b.o = o;
                            this.MediaLibrariesAdded.emit(b)
                        },
                        removed: (id) => {
                            var b = new Object();
                            b.time = new Date();
                            b.id = id;
                            this.MediaLibrariesRemoved.emit(b)
                        },
                        changed: (id, o) => {
                            o.DDHHMMSS = formatTime(o.duration);

                            var b = new Object();
                            b.time = new Date();
                            b.id = id;
                            b.o = o;
                            this.MediaLibrariesChanged.emit(b)

                        },
                    });




                    // var ret = MediaLibraries.find({ "$and": [{ "customerId": this.customerId }, { "channelId": this.channelId }] }, options).fetch();


                    // ret.forEach((medialib) => {
                    //     // console.dir(medialib);
                    //     var ml = new Object();
                    //     ml.id = medialib._id;
                    //     ml.customerId = medialib.customerId;
                    //     ml.channelId = medialib.channelId;
                    //     //ml._id._str = o._id._str;
                    //     ml.program = medialib.program;
                    //     ml.heading = medialib.heading;
                    //     ml.detail = medialib.detail;
                    //     ml.duration = medialib.duration;
                    //     ml.sortOrder = medialib.sortOrder;
                    //     ml.times = medialib.times;
                    //     ml.days = medialib.days;
                    //     ml.html = medialib.html;
                    //     this.mediaLibrariesList.push(ml);
                    //     console.log("forEach ~ " + ml.id);
                    // });

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

            setTimeout(() => {

                this.initialLoad = true;
                if (this.mediaLibrariesList.length == this.totalItems) {
                    this.setTimes(this.mediaLibrariesList);


                }

            }, 1000);

        }, true);






        function formatTime(duration: number) {

            var h1 = Math.floor(duration / (60 * 60));
            duration %= 60 * 60;
            var m1 = Math.floor(duration / 60);
            duration %= 60;
            var h2 = h1 ? h1 + ':' : '',
                m2 = h1 && m1 < 10 ? '0' + m1 : m1,
                s2 = duration < 10 ? '0' + duration : duration;
            return h2 + m2 + ':' + s2;
        }


    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit being called when component is initalized after constructor method from adProgramViewSchedule.ts");
    }


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {


        for (let propName in changes) {
            // console.log("ngOnChanges called - propName:'" + propName)
            if (propName == 'customerId' || propName == 'channelId') {

                let chng = changes[propName];

                let cur = JSON.stringify(chng.currentValue);
                let prev = JSON.stringify(chng.previousValue);
                // console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);

                if (cur != null) {
                    if (cur != prev) {
                        console.log(`${propName}...: currentValue = ${cur}, previousValue = ${prev}`);
                    }
                }
            }
        }


    }

    ngOnDestroy() {
        console.log("ngOnDestroy called");

        if (this.RunAtArray.length > 0) {
            clearTimeout(this.RunAtArray[0].ID);
            clearTimeout(this.RunAtArray[1].ID);
            // this.search = [];
            // this.mediaLibrariesList = [];
            // this.RunAtArray = [];
        }


    }





    changeMuteState() {
        this.muted = !this.muted;

    }
    changeSignage(customerId, channelId) {
        console.log("changeSignage called");

        this.searchCustomerId.set(customerId);
        this.searchChannelId.set(channelId);




    }
    killTime() {

        if (this.mediaLibrariesList.length == 0) { return; }
        // Run 1st program now
        var item = this.mediaLibrariesList[0];

        var originalStartTime = this.RunAtArray[0].ProgramTime;
        var originalEndTime = this.RunAtArray[1].ProgramTime;
        var newDuration = parseInt(this.mediaLibrariesList[0].duration);
        var newEndTime = new Date(originalStartTime.getTime());

        console.log("originalStartTime: " + originalStartTime)
        console.log("originalEndTime: " + originalEndTime)
        console.log("newDuration: " + newDuration)
        console.log("newEndTime: " + newEndTime)


        clearTimeout(this.RunAtArray[1].ID);
        var runAtRet = 0;
        var iframe = 'iframeMain1';
        var UpdateTime = newEndTime;
        var func = "StopMedia('" + item.program + "' , '" + item.id + "', " + item.customerId + ", '" + iframe + "')";
        runAtRet = this.RunAt(UpdateTime, func, false, this);

    }

    extendTime() {

        if (this.mediaLibrariesList.length == 0) { return; }
        // Run 1st program now
        var item = this.mediaLibrariesList[0];

        var originalStartTime = this.RunAtArray[0].ProgramTime;
        var originalEndTime = this.RunAtArray[1].ProgramTime;
        var newDuration = parseInt(this.mediaLibrariesList[0].duration);
        var newEndTime = new Date(originalStartTime.getTime() + (newDuration * 1000));

        console.log("originalStartTime: " + originalStartTime)
        console.log("originalEndTime: " + originalEndTime)
        console.log("newDuration: " + newDuration)
        console.log("newEndTime: " + newEndTime)


        clearTimeout(this.RunAtArray[1].ID);
        var runAtRet = 0;
        var iframe = 'iframeMain1';
        var UpdateTime = newEndTime;
        var func = "StopMedia('" + item.program + "' , '" + item.id + "', " + item.customerId + ", '" + iframe + "')";
        runAtRet = this.RunAt(UpdateTime, func, false, this);

        this.RunAtArray.splice(1, 1)
        this.RunAtArray.push(runAtRet);

        // var func = "DownloadMedia('" + item.program + "' , '" + item.id + "', " + item.customerId + ", '" + iframe + "')";
        // runAtRet = this.RunAt(UpdateTime, func, false, this);

    }

    setTimes(mediaLibrariesList) {

        console.log("setting time")

        var timeNow = new Date();
        var programmeCount = 0;
        var totalMillsAccum = 0;
        var totalMillsAccumDownload = 0;
        var totalMillsDelayDownload = 4;
        var totalprogrammeCount = mediaLibrariesList.length;
        var runAtRet = 0;

        this.RunAtArray = [];
        var iframe = 'iframeMain1';
        var url = "";
        var logMe = true;

        // Run 1st program now
        var item = mediaLibrariesList[0];

        var UpdateTime = new Date(timeNow.getTime() + totalMillsAccum);
        var func = "PlayMedia('" + item.program + "' , '" + item.id + "', " + item.customerId + ", " + item.duration + ", '" + iframe + "')";
        runAtRet = this.RunAt(UpdateTime, func, false, this);
        this.RunAtArray.push(runAtRet);
        console.dir(this.RunAtArray)


        totalMillsAccum = totalMillsAccum + (item.duration * 1000);

        UpdateTime = new Date(timeNow.getTime() + totalMillsAccum);
        func = "StopMedia('" + item.program + "' , '" + item.id + "', " + item.customerId + ", '" + iframe + "')";
        runAtRet = this.RunAt(UpdateTime, func, false, this);
        this.RunAtArray.push(runAtRet);

        // this.extendTime();

    }

    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /// RunAt(DateTimeToRun, func, info)
    /// A helper method that takes the hard work out of running a process at a
    /// specified time.
    /// Parameters:-
    /// A valid date in the future, eg. new Date(2004, 10 , 13 , 10, 32 , 30).
    /// Dates that have passed will cause the function to execute immediately.
    /// Info switch. Set to true for debuging. Will give out time the process will fire.
    /// The method to run in the form of a string, e.g. DoTimedProcess().
    /// Returns:
    /// A timout ID, which can be held in an array for later cancelling if required.
    /// Copywright KJB Systems 2004
    RunAt(DateTimeToRun, func, info, me) {
        var timeNow = new Date();
        var elapsedStart = (DateTimeToRun.getTime() - timeNow.getTime());
        var theDateAsDate = new Date(timeNow.getTime() + elapsedStart);


        // var iTimeout = new this.setTimoutObject(setTimeout(() => { eval(func) }, elapsedStart), DateTimeToRun);
        var iTimeout = new this.setTimoutObject(window.setTimeout(function () { eval(func) }, elapsedStart), DateTimeToRun);
        if (info) {
            var r = new Object();

            r.StartTime = timeNow;
            r.EndTime = timeNow;
            r.AdmirChannelId = "-999";
            r.NetworkNodeId = "-999";

            r.Comments = "In RunAt: runs at:" + iTimeout.ProgramTime + " / " + func;
            // jr = JSON.stringify(r);
            alert(r.Comments)

            //logThis(jr);
        }
        return iTimeout;

        function PlayMedia(program, mediaLibraryId, customerId, duration, targetIFrame) {
            me.PlayMedia(program, mediaLibraryId, customerId, duration, targetIFrame);
        }

        function StopMedia(program, mediaLibraryId, customerId, targetIFrame) {
            me.StopMedia(program, mediaLibraryId, customerId, targetIFrame);

        }
        function DownloadMedia(program, mediaLibraryId, customerId, targetIFrame) {
            me.DownloadMedia(program, mediaLibraryId, customerId, targetIFrame);

        }
    }

    setTimoutObject(ID, ProgramTime) {
        this.ID = ID.data.handleId;
        this.ProgramTime = ProgramTime;

    }

    PlayMedia(program, mediaLibraryId, customerId, duration, targetIFrame) {



        // this.playingId = this.mediaLibrariesList[0].id;
        // console.log("PlayMedia - this.playingId ; " + this.playingId);

        this.adProgramViewScheduleItem.PlayMedia();


    }
    StopMedia(program, mediaLibraryId, customerId, targetIFrame) {

        this.adProgramViewScheduleItem.StopMedia();

        var vmShifted = this.mediaLibrariesList.shift()
        var vmPushed = this.mediaLibrariesList.push(vmShifted);


        console.log("StopMedia:this.mediaLibrariesList.length: " + this.mediaLibrariesList.length);

        this.setTimes(this.mediaLibrariesList);

        this.zone.run(() => { // Change the property within the zone, CD will run after

        });



    }
    DownloadMedia(program, mediaLibraryId, customerId, targetIFrame) {
        console.log("DownloadMedia - program; " + program);
        console.log("DownloadMedia - program; " + program);
        console.log("DownloadMedia - program; " + program);
        console.log("DownloadMedia - program; " + program);




    }
}

