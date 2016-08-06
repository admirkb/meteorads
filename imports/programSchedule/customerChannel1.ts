// Meteor

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Admir
import {adProgramViewSchedule} from '../../imports/directives/adProgramViewSchedule/adProgramViewSchedule';

import template from './customerChannel1.html';
// Component

@Component({
  directives: [adProgramViewSchedule],
  template
})
export class CustomerChannel1 implements OnInit {
  @ViewChild(adProgramViewSchedule) adProgramViewSchedule: adProgramViewSchedule;
  protected _customerId: number;
  protected _channelId: number;
  protected _showListing: boolean;
  sub: any;

  constructor(protected route: ActivatedRoute) {





    // this._customerId = parseInt(this._routeParams.get('customerId'));
    // this._channelId = parseInt(this._routeParams.get('channelId'));
    // this._showListing = JSON.parse(this._routeParams.get('showListing'));
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

      this._customerId = +params['customerId'];;
      this._channelId = +params['channelId'];;
      this._showListing = JSON.parse(params['showListing']);

      this.adProgramViewSchedule.changeSignage(this._customerId, this._channelId);
    });
  }
}