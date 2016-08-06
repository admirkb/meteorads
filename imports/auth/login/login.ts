import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {MeteorComponent} from 'angular2-meteor';
// import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import { provideRouter, RouterConfig, ROUTER_DIRECTIVES, Router } from '@angular/router';



// Admir

import {AdmirMessagingCore} from  '../../../client/core';
import template from './login.html';
@Component({
  selector: 'login',
  directives: [ROUTER_DIRECTIVES],
  template
})


export class Login extends MeteorComponent {
  loginForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  login(credentials) {
    if (this.loginForm.valid) {
      Meteor.loginWithPassword(credentials.email, credentials.password, (err) => {
        if (err) {
          this.error = err;
        }
        else {



          //     var loggedInUser = Meteor.user();

          // if (Roles.userIsInRole(loggedInUser, ['caller'], 'default-group')) {
          //              this.router.navigate(['/HomeView']);
          // }
          // if (Roles.userIsInRole(loggedInUser, ['player'], 'default-group')) {
          //           this.router.navigate(['/HomeView']);
          // }

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

        if (!Roles.userIsInRole(Meteor.userId(), ['registered'], 'default-group')) {
          var roles = ['registered'];
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

        if (!Roles.userIsInRole(Meteor.userId(), ['registered'], 'default-group')) {
          var roles = ['registered'];
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

        if (!Roles.userIsInRole(Meteor.userId(), ['registered'], 'default-group')) {
          var roles = ['registered'];
          Roles.setUserRoles(Meteor.userId(), roles, 'default-group');
        }
        this.router.navigate(['hHomeView']);
      }
    });
  }
}