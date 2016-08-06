// Meteor

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Admir
import {adProgramViewSchedule} from '../../imports/directives/adProgramViewSchedule/adProgramViewSchedule';

import template from './fullScreen.html';
// Component

@Component({
  directives: [adProgramViewSchedule],
  template
})
export class FullScreen {

  
  constructor(protected route: ActivatedRoute) {



    // this._customerId = parseInt(this._routeParams.get('customerId'));
    // this._channelId = parseInt(this._routeParams.get('channelId'));
    // this._showListing = JSON.parse(this._routeParams.get('showListing'));
  }
}