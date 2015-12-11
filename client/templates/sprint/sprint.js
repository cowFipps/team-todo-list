Template.sprint.rendered = function() {

  // $(document).ready(function(){
  //   // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  //   $('.modal-trigger').leanModal();
  // });

};

Template.sprint.helpers({
  sprints: function(){
    return sprintsCollection.findOne({});
  },
  hasLists: function(){
    console.log('hasLists: ', this.lists.count());
    if(this.lists.count() > 0){
      return true;
    } else {
      return false;
    }
  },
  totalSprintItemCount: function(){
    console.log('this: ', this);
    return itemsCollection.find({}).count();
  },
  totalSprintCompletedItemCount: function(){
    console.log('this: ', this);
    return itemsCollection.find({complete: true}).count();
  },
  totalSprintCompletePercentage: function(){
    var totalItems = itemsCollection.find({}).count();
    var completeItems = itemsCollection.find({complete: true}).count();
    var totalPercentage = (completeItems/totalItems).toFixed(2);
    return totalPercentage*100.00 >> 0;
  },
  startDatePretty: function(){
    return moment(this.startDate).format('ll');
  },
  endDatePretty: function(){
    return moment(this.endDate).format('ll');
  }
});

Template.sprint.events({
  // 'change [data-action=updateItemBody]': function(event){
  //   event.preventDefault();
  //
  //   var updated = itemsCollection.update(this._id, {$set:{body: event.currentTarget.value}});
  //   console.log('updated: ', updated);
  // },
  // 'click [data-action=markComplete]': function(event){
  //   event.preventDefault();
  //   var status = itemsCollection.findOne(this._id).complete;
  //   if(status === true){
  //     itemsCollection.update(this._id, {$set:{complete: false}});
  //   } else {
  //     itemsCollection.update(this._id, {$set:{complete: true}});
  //   }
  // },
  'click [data-action=removeListFromSprint]': function(event){
    event.preventDefault();

    Meteor.call('removeList', this._id);

  },
  // 'click [data-action=removeItem]': function(event){
  //   event.preventDefault();
  //   itemsCollection.remove(this._id);
  // },
  // 'click [data-action=addItem]': function(event){
  //   event.preventDefault();
  //   itemsCollection.insert({parentList: this._id});
  // }
});

Template.listItem.rendered = function() {

  console.log('rendered: ', this.data._id);
  var listId = '';
  listId = 'remove-list-' + this.data._id;
  console.log('#' + listId);
  $('#' + listId).leanModal();

};

Template.listItem.helpers({
  lists: function(){
    //need to refine to lists only in this sprint
    return listsCollection.find({parentSprint: sprintsCollection.findOne({})._id});
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
  completedItemCount: function(){
    return itemsCollection.find({parentList: this._id, complete: true}).count();
  }
});

Template.listItem.events({
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
  // 'click [data-action=removeListFromSprint]': function(event){
  //   event.preventDefault();
  //   var status = listsCollection.remove(this._id);
  //   if(typeof status != 'undefined'){
  //     Materialize.toast('Sad to see you go...', 3000, 'green')
  //   } else {
  //     Materialize.toast('uh oh... there was a problem...', 3000, 'red')
  //   }
  // },
  'click [data-action=removeItem]': function(event){
    event.preventDefault();
    itemsCollection.remove(this._id);
  },
  'click [data-action=addItem]': function(event){
    event.preventDefault();
    itemsCollection.insert({parentList: this._id});
  }
});
