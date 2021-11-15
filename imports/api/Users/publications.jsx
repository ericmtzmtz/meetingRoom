import { Meteor }from "meteor/meteor";

Meteor.publish('usersList', function(){
    return Meteor.users.find({});
})