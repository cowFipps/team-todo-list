listsCollection = new Mongo.Collection('lists');

if (Meteor.isServer) {
  Meteor.publish('lists', function () {
    return listsCollection.find();
  });
}

// if (Meteor.isClient) {
//   Meteor.subscribe('lists');
// }

//before inserting the item, set these values on the document
listsCollection.before.insert(function (userId, doc) {

});

listsCollection.attachSchema(new SimpleSchema({
  parentSprint: {
    type: String,
    max: 100,
  },
  resourceId: {
    type: String,
    max: 25
  },
  resourceName: {
    type: String,
    max: 200
  }
}));


Meteor.methods({
  'deleteList': function(listId) {

    check(resourceId, String);

    var deleted = listsCollection.remove({
        _id: listId
    });

    if( !deleted){
      if(Meteor.isClient)
        Materialize.toast('Whoops! Not deleted', 4000, 'red');

      throw new Meteor.Error('invalid', "You weren't able to delete this list.");

    } else {
      if(Meteor.isClient)
        Materialize.toast('Awesome! You deleted that list!', 4000, 'light-green');
    }

  }
});
