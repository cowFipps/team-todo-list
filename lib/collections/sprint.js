sprintsCollection = new Mongo.Collection('sprints');

if (Meteor.isServer) {
  Meteor.publish('sprints', function () {
    return sprintsCollection.find();
  });
}

// if (Meteor.isClient) {
//   Meteor.subscribe('sprints');
// }

//before inserting the item, set these values on the document
sprintsCollection.before.insert(function (userId, doc) {

});

sprintsCollection.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  startDate: {
    type: String,
    autoform: {
      type: "pickadate",
      timezoneId: "America/New_York"
    },
    optional: true
  },
  endDate: {
    type: String,
    autoform: {
      type: "pickadate",
      timezoneId: "America/New_York"
    },
    optional: true
  }
}));


Meteor.methods({

});
