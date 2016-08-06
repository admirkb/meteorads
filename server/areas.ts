
import { Meteor } from 'meteor/meteor';
import {Areas} from '../imports/api/areas';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Branches} from '../imports/api/branches';

Meteor.publish('areas', function (options: Object, searchString: string) {

    let selector = {
        description: { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' },
    };

    Counts.publish(this, 'numberOfRecords', Areas.find(selector), { noReady: true });

    console.log("selector" + selector)
    console.dir(selector)
    console.dir(options)
    console.log("searchString" + searchString)
    // return Areas.find(selector, options);
    // options = {
    //     transform: function (area) {
    //         area.branches = Branches.find({ areaId: "fb6b0eff47736e321c6b1666" }).fetch();
    //         return area;
    //     }
    // }

    // var tempAreas = Areas.find(selector, options);

    // var tempAreas2 = Areas.find(selector, options).forEach(function (area) {
    //     // area.branches = []

    //     // var tempBranches = Branches.find({ areaId: area._id._str }).fetch();

    //     // tempBranches.forEach(function (branch) {
    //     //     area.branches.push(branch)
    //     //       console.dir(branch)
    //     // });
    // });

    //   var tempAreas2 = Areas.find(selector, options);
    // return tempAreas2;

    // options = {
    //     transform: function (item) {
    //         item.branches = Branches.find({ areaId: "fb6b0eff47736e321c6b1666" }).fetch();
    //         return item;
    //     }
    // }

    // var tempAreas2 = Areas.find(selector, options).forEach(function (area) {
    //     area.branches = [];
    // });
    return Areas.find(selector, options);

});


// Meteor.publishComposite('postsWithComments', {
//     find: function() {
//         return Posts.find({})
//     },
//     children: [// comments
//         {
//             find: function(post) {
//                 return Comments.find({postId: post._id})
//             }
//         }
//     ]
// })

// Meteor.publish('areasAndBranches', function (options: Object, searchString: string) {
//     find: function() {
//         return Posts.find({})
//     }

//     let selector = {
//         description: { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' },
//     };


//     return Areas.find(selector, options);

// });


// Meteor.publish('areasAndBranches', function (options: Object, searchString: string) {

//     let selector = {
//         description: { '$regex': '.*' + searchString || '' + '.*', '$options': 'i' },
//     };

//     Counts.publish(this, 'numberOfRecords', Areas.find(selector), { noReady: true });


// return [
//     Areas.find(selector, options),
//     // Branches.find({ areaId: area._id._str })
//   ];


// });
Meteor.methods({


    'areas.insert'(branch) {
        var self = this;
        Areas.insert(branch);
    },
    'areas.remove'(branchId) {

        Areas.remove(branchId);
    },
    'areas.update'(branchId, action) {
        // console.dir(action)
        Areas.update(branchId, action);
    },
    'areas.get'() {
        console.log('on server, Areas.find({}) called');



        var tempAreas = Areas.find({}, { fields: { description: 1 } }).fetch();

        tempAreas.forEach(function (area) {

            area.branches = []
            // let searchString = ObjectId(area._id._str);
            // let selector = {
            //     areaId: { '$regex': searchString, '$options': 'i' },
            // };
            // console.log(selector)

            var tempBranches = Branches.find({ areaId: area._id._str });

            tempBranches.forEach(function (branch) {
                area.branches.push(branch)

            });



        });
        // console.dir(tempAreas)
        // return Areas.find({}, { fields: { description: 1 } }).fetch();

        return tempAreas;
    },


});