itemsCollection = new Mongo.Collection('items');

if (Meteor.isServer) {
  Meteor.publish('items', function () {
    return itemsCollection.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('items');
}

//before inserting the item, set these values on the document
itemsCollection.before.insert(function (userId, doc) {
  doc.completed = false;
});

itemsCollection.attachSchema(new SimpleSchema({
  parentList: {
    type: String,
    max: 100,
  },
  body: {
    type: String,
    max: 400
  },
  completed: {
    type: Boolean
  }
}));


Meteor.methods({
  'deleteItem': function(itemId) {

    check(resourceId, String);

    var deleted = itemsCollection.remove({
        _id: itemId
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
  'checkItem': function(itemId) {

    check(resourceId, String);

    if(itemsCollection.findOne(itemId).items[0].completed === true){
      var checked = itemsCollection.update({
          _id: itemId
      },{
        items: { completed: false}
      });
    } else {
      var checked = itemsCollection.update({
        _id: itemId
      },{
        items: { completed: false}
      });
    }

    if( !checked){
      if(Meteor.isClient)
        Materialize.toast('Whoops! Not updated', 4000, 'red');

      throw new Meteor.Error('invalid', "You weren't able to update this item.");

    } else {
      if(Meteor.isClient)
        Materialize.toast('Awesome! You updated that item!', 4000, 'light-green');
    }

  },
});
