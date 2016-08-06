import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Branches = new Mongo.Collection("branches", { idGeneration: 'MONGO' });

Branches.allow({
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