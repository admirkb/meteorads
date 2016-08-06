
import { Meteor } from 'meteor/meteor';
import {Branches} from '../imports/api/branches';
import {Counts} from 'meteor/tmeasday:publish-counts';


Meteor.publish('branches', function (options: Object, searchString: string) {

    let selector = {
        address: { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' },
    };

    Counts.publish(this, 'numberOfRecords', Branches.find(selector), { noReady: true });

    console.log("selector" + selector)
    console.dir(selector)
    console.dir(options)
    console.log("searchString" + searchString)
    return Branches.find(selector, options);
});

Meteor.methods({


    'branches.insert'(branch) {
        var self = this;
        Branches.insert(branch);
    },
    'branches.remove'(branchId) {

        Branches.remove(branchId);
    },
    'branches.update'(branchId, action) {
        console.dir(branchId);
        console.dir(action);
        Branches.update(branchId, action);


    },
    'branches.getByAreaId'(areaId) {
        //  console.log("branches.getByAreaId: " + areaId)
        // function xxx() {
        //     return Branches.find({ areaId: areaId }).fetch();
        // }


        // return Meteor.wrapAsync(xxx);
        return Branches.find({ areaId: areaId }).fetch();
    },


});