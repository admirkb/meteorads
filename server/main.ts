import { Meteor } from 'meteor/meteor';

import {loadBugs} from './load-bugs';
import {loadStaffs} from './load-staffs';
import {loadLocales} from './load-locales';
import {loadGenericCollection} from './startup/load-generic';
import {loadMediaLibraries} from './startup/loadMediaLibraries';
import {loadBranches} from './startup/loadBranches';
import {loadAreas} from './startup/loadAreas';

import './bugs';
import './staffs';
import './locales';

import {thisBranch} from '../imports/api/constants';

Meteor.startup(() => {
  console.log("Meteor is starting for branch: " + thisBranch)

  loadBugs();
  loadStaffs();
  loadLocales();
  // console.log("Meteor is starting loadGenericCollection")
  // loadGenericCollection();
  console.log("Meteor is starting loadMediaLibraries")
  loadMediaLibraries();
  console.log("Meteor is starting loadBranches")
  loadBranches();
  console.log("Meteor is starting loadAreas")
  loadAreas();

});
