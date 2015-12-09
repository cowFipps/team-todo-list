Template.sprint.helpers({
  sprints: function(){
    return sprintsCollection.find({});
  },
  lists: function(){
    //need to refine to lists only in this sprint
    return listsCollection.find({});
  },
  items: function(){
    return itemsCollection.find({parentList: this._id});
  },
  itemBody: function(){
    return itemsCollection.findOne(this._id).body;
  },
  itemStatus: function(){
    var status = itemsCollection.findOne(this._id).complete;
    if(status === false){
      return '';
    } else {
      return 'checked';
    }
  },
  totalItemCount: function(){
    return itemsCollection.find({parentList: this._id}).count();
  },
  completeItemCount: function(){
    console.log('parentList id: ', this._id);
    return itemsCollection.find({parentList: this._id, complete: true}).count();
  }
});

Template.sprint.events({
  'change [data-action=updateItemBody]': function(event){
    event.preventDefault();

    var updated = itemsCollection.update(this._id, {$set:{body: event.currentTarget.value}});
    console.log('updated: ', updated);
  },
  'click [data-action=markComplete]': function(event){
    event.preventDefault();
    var status = itemsCollection.findOne(this._id).complete;
    if(status === true){
      itemsCollection.update(this._id, {$set:{complete: false}});
    } else {
      itemsCollection.update(this._id, {$set:{complete: true}});
    }
  },
  'click [data-action=removeListFromSprint]': function(event){
    event.preventDefault();
    var status = listsCollection.remove(this._id);
    if(typeof status != 'undefined'){
      Materialize.toast('Sad to see you go...', 3000, 'green')
    } else {
      Materialize.toast('uh oh... there was a problem...', 3000, 'red')
    }
  },
  'click [data-action=removeItem]': function(event){
    event.preventDefault();
    itemsCollection.remove(this._id);
  },
  'click [data-action=addItem]': function(event){
    event.preventDefault();
    itemsCollection.insert({parentList: this._id});
  }
})
