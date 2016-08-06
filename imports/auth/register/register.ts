import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// // Angular
import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
// import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { provideRouter, RouterConfig, ROUTER_DIRECTIVES, Router } from '@angular/router';



// Admir

import template from './register.html';
@Component({
  selector: 'signup',
  directives: [ROUTER_DIRECTIVES],
  template
})
export class Register extends MeteorComponent {
  signupForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.signupForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  signup(credentials) {
    if (this.signupForm.valid) {
      Accounts.createUser({ email: credentials.email, password: credentials.password }, (err) => {
        if (err) {
          this.error = err;
        }
        else {

          var roles = ['Registered'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');

          this.router.navigate(['/homeView']);
        }
      });
    }
  }

  loginWithGoogle() {
    Meteor.loginWithGoogle({}, (err) => {
      if (err) {
        this.error = err;
        alert('error : ' + err.message);
      }
      else {

        if (!Roles.userIsInRole(Meteor.userId(), ['Registered'], 'default-group')) {
          var roles = ['Registered'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');
        }
        this.router.navigate(['/homeView']);
      }
    });
  }

  loginWithFacebook() {
    Meteor.loginWithFacebook({}, (err) => {
      if (err) {
        this.error = err;
        alert('error : ' + err.message);
      }
      else {

        if (!Roles.userIsInRole(Meteor.userId(), ['Registered'], 'default-group')) {
          var roles = ['Registered'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');
        }
        this.router.navigate(['/homeView']);
      }
    });
  }

  loginWithTwitter() {
    Meteor.loginWithTwitter({}, (err) => {
      if (err) {
        this.error = err;
        alert('error : ' + err.message);
      }
      else {

        if (!Roles.userIsInRole(Meteor.userId(), ['Registered'], 'default-group')) {
          var roles = ['Registered'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');
        }
        this.router.navigate(['/homeView']);
      }
    });
  }

}