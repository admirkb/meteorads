import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, OnChanges, Input, ElementRef, ViewChild, SimpleChange} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir

@Component({
  selector: 'ad-program-view-schedule-item',
  template: `

<div id="placeholder1" [innerHTML]="thedata.html"  [ngStyle]="{width: width, height: height, minWidth:width , minHeight:height}" style="background-color:transparent; position:relative; border-width:2px;border-style:solid; border-color:yellow; margin:0px; padding:0px; overflow:visible;">

</div>


    `,
})

export class adProgramViewScheduleItem extends MeteorComponent implements OnInit, OnChanges {

  @Input() thedata;
  @Input() theId;
  @Input() theHtml;
  @Input() key;
  @Input() playing;
  @Input() playingId;
  private _element: any;
  @Input() width;
  @Input() height;
  @Input() muted: boolean = false;


  constructor(elementRef: ElementRef) {
    super();
    this.muted = false;
    this._element = elementRef.nativeElement;

  }


  ngOnInit() {

    //console.log("ngOnInit being called when component is initalized after constructor method from adProgramViewScheduleItem.ts");

  }

  public PlayMedia() {

    console.log("PlayMedia called ; " + this.thedata.heading);
    var placeholder1 = this._element.getElementsByTagName('div')[0]
    var firstChild = placeholder1.firstChild;
    if (firstChild != null) {

      var type = (typeof firstChild)

      switch (firstChild.nodeName) {
        case 'VIDEO':
          this.PlayVideo(firstChild);
          break;
        case 'AUDIO':
          this.PlayAudio(firstChild);
          break;
        case 'ADMIR':
          this.PlayAdmir(firstChild);
          break;
        case 'IFRAME':
          this.PlayIframe(firstChild);
          break;
      }
    }
  }
  public StopMedia() {

    console.log("StopMedia called ; " + this.thedata.heading);
    var placeholder1 = this._element.getElementsByTagName('div')[0]
    var firstChild = placeholder1.firstChild;
    if (firstChild != null) {

      var type = (typeof firstChild)

      switch (firstChild.nodeName) {
        case 'VIDEO':
          this.StopVideo(firstChild);
          break;
        case 'AUDIO':
          this.StopAudio(firstChild);
          break;
        case 'ADMIR':
          this.StopAdmir(firstChild);
          break;
        case 'IFRAME':
          this.StopIframe(firstChild);
          break;
      }
    }
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    for (let propName in changes) {
      if (propName == 'muted') {
        this.changeMuteState();
      }
    }
  }

  // ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
  //   // for (let propName in changes) {
  //   //   // console.log("ngOnChanges called - propName:'" + propName)
  //   //   if (propName == 'playingId') {

  //   //     let chng = changes[propName];

  //   //     let cur = JSON.stringify(chng.currentValue);
  //   //     let prev = JSON.stringify(chng.previousValue);

  //   //     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);

  //   //     if (cur != null) {
  //   //       if (cur != prev) {
  //   //         console.log("propName == 'playingId changed'")
  //   //         // console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);

  //   //         var placeholder1 = this._element.getElementsByTagName('div')[0]
  //   //         console.dir(placeholder1)

  //   //         var firstChild = placeholder1.firstChild;
  //   //         if (firstChild != null) {
  //   //           console.dir(firstChild)
  //   //           var type = (typeof firstChild)
  //   //           console.dir(type)

  //   //           switch (firstChild.nodeName) {
  //   //             case 'VIDEO':
  //   //               this.PlayVideo(firstChild);
  //   //               break;
  //   //             case 'AUDIO':
  //   //               this.PlayAudio(firstChild);
  //   //               break;
  //   //             case 'ADMIR':
  //   //               this.PlayAdmir(firstChild);
  //   //               break;
  //   //             case 'IFRAME':
  //   //               this.PlayIframe(firstChild);
  //   //               break;
  //   //           }
  //   //         }
  //   //       }
  //   //     }
  //   //   }
  // }

  changeMuteState() {

    console.log("changeMuteState called ; " + this.thedata.heading);
    var placeholder1 = this._element.getElementsByTagName('div')[0]
    var firstChild = placeholder1.firstChild;
    if (firstChild != null) {

      var type = (typeof firstChild)

      switch (firstChild.nodeName) {
        case 'VIDEO':
          firstChild.muted = this.muted;
          break;
        case 'AUDIO':
          firstChild.muted = this.muted;
          break;
      }
    }
    console.log("this.muted: " + this.muted)

  }

  PlayVideo(vid) {
    vid.style.width = "100%";
    vid.style.height = "100%";
    vid.style.objectFit = "fill"

    console.dir(vid)

    if (this.muted) {
      vid.muted = true;
    }
    // vid.pause();

    vid.play();
  }
  PlayAudio(aud) {


    console.dir(aud)

    // aud.pause();
    aud.play();
  }
  PlayAdmir(el) {
    console.log("el")
    console.dir(el)

  }
  PlayIframe(el) {
    console.log("el")
    console.dir(el)

  }

  StopVideo(vid) {


    console.dir(vid)
    vid.pause();
  }
  StopAudio(aud) {


    console.dir(aud)
    aud.pause();
  }
  StopAdmir(el) {
    console.log("el")
    console.dir(el)

  }
  StopIframe(el) {
    console.log("el")
    console.dir(el)

  }
}
