resourcesCollection = new Mongo.Collection('resources');

if (Meteor.isServer) {
  Meteor.publish('resources', function () {
    return resourcesCollection.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('resources');
}

//before inserting the item, set these values on the document
resourcesCollection.before.insert(function (userId, doc) {

});

resourcesCollection.attachSchema(new SimpleSchema({
  name: {
    type: String,
    max: 100,
  },
  resourceImage: {
    type: String,
    max: 100,
  }
}));


Meteor.methods({
  'deleteResource': function(resourceId) {

    check(resourceId, String);

    var deleted = resourcesCollection.remove({
        _id: resourceId
    });

    if( !deleted){
      if(Meteor.isClient)
        Materialize.toast('Whoops! Not deleted', 4000, 'red');

      throw new Meteor.Error('invalid', "You weren't able to delete this item.");

    } else {
      if(Meteor.isClient)
        Materialize.toast('Awesome! You deleted that item!', 4000, 'light-green');
    }

  },
});
