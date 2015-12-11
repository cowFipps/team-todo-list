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
  weekNumber: {
    type: Number
  },
  startDate: {
    type: Date,
    autoform: {
      type: "pickadate",
      timezoneId: "America/New_York"
    },
    optional: true
  },
  endDate: {
    type: Date,
    autoform: {
      type: "pickadate",
      timezoneId: "America/New_York"
    },
    optional: true
  }
}));

Meteor.methods({
  removeList: function(listId){
    var removeItemsStatus = itemsCollection.remove({parentList:listId});
    var removeListStatus = listsCollection.remove(listId);

    if(Meteor.isClient){
      if(typeof removeItemsStatus != 'undefined' || typeof removeListStatus != 'undefined'){
        Materialize.toast('Sad to see you go...', 3000, 'green');
      } else {
        Materialize.toast('uh oh... there was a problem...', 3000, 'red')
      }
    }
  }
});
