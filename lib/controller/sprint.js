//Extends MainController which extends the main RouteController.
sprintController = MainController.extend({
  //loadingTemplate in Router.config() is automatically until waitOn returns.
  waitOn: function() {
    //wait until the subscription is ready.
    return this.subscribe('sprints') && this.subscribe('lists') && this.subscribe('items');
  },
  //set the data context for IdeaList Route / Template
  data: function() {
    return {
      // sprints: sprintsCollection.findOne({}),
      lists: listsCollection.find({}),
      items: itemsCollection.find({})
    }
  },
  onAfterAction: function() {
    //do something cool
  }
});
