import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Branches} from '../../imports/api/branches';

// Transform will be overtten by any other transfor
// Just set here for test
export const Areas = new Mongo.Collection("areas",
    {
        idGeneration: 'MONGO',
        transform: function (doc) {
            doc.kjb = function () {
                return "KJB"
            };
            doc.times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            return doc;
        }
    });

Areas.allow({
    insert: function (userId, program) {
        return true;
    },
    update: function (userId, program) {
        return true;
    },
    remove: function (userId, program) {

        return true;
        //return userId && program.userId === userId;
    }
});