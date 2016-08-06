// Meteor

// Angular
import {Component, Pipe} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir

// Component(s)
@Pipe({
  name: 'displayName'
})
export class DisplayName {
  transform(user: Meteor.User): string {
    if (!user) {
      return '';
    }

    // console.dir(user)
    if (user.username) {
      return user.username;
    }

    if (user.profile) {
      return user.profile.name;
    }

    if (user.emails) {
      return user.emails[0].address;
    }

    return '';
  }
}