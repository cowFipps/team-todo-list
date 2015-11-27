Template.header.rendered = function() {

  //pause after render and then initialize materialize functions
  Meteor.setTimeout(function() {


  // Initialize collapse button
  this.$(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  // this.$('.collapsible').collapsible();


  }.bind(this), 200);

};

Template.header.events({
	'click [data-action=logout]': function(event) {
    event.preventDefault();
    AccountsTemplates.logout();
  }
});
