Template.header.rendered = function() {

  //pause after render and then initialize materialize functions
  Meteor.setTimeout(function() {

    // Initialize collapse button
    this.$(".button-collapse").sideNav();
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    // this.$('.collapsible').collapsible();

  }.bind(this), 200);

};

Template.header.helpers({
  resources: function(){
    find({'post': {$ne : ""}})
    return resourcesCollection.find({});
  },
  weekNumber: function(){
    Date.prototype.getWeek = function() {
      var determinedate = new Date();
      determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
      var D = determinedate.getDay();
      if(D == 0) D = 7;
      determinedate.setDate(determinedate.getDate() + (4 - D));
      var YN = determinedate.getFullYear();
      var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
      var WN = 1 + Math.floor(ZBDoCY / 7);
      return WN;
    }

    var mydate = new Date();
    return mydate.getWeek();
  }
});

Template.header.events({
	'click [data-action=addResourseToSprint]': function(event) {
    event.preventDefault();
    console.log('header this: ', this);
    var alreadyInList = listsCollection.findOne({parentSprint: '5BMxKAm2RjTMMPAE5', resourceId: this._id});
    if(typeof alreadyInList != 'undefined'){
      Materialize.toast("Woahh doggy! You're already in the sprint!", 3000, 'red');
    } else {
      var added = listsCollection.insert({
        parentSprint: '5BMxKAm2RjTMMPAE5',
        resourceId: this._id,
        resourceName: this.name
      });

      if(added){
        Materialize.toast('Added to the list!', 3000, 'green');
      } else {
        Materialize.toast("We're have a little bit of trouble with your request...", 10000, 'red');
      }
    }
  }
});
