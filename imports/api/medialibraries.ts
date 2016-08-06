import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const MediaLibraries = new Mongo.Collection("mediaLibraries", { idGeneration: 'MONGO' });

MediaLibraries.allow({
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