// Router.route('/', {
//   name: 'home'
// });

Router.route('/', {
  name: 'sprint',
  controller: sprintController
});

// plugin from useraccounts:iron-routing
Router.plugin('ensureSignedIn', {
    only: [ 'list' ]
});
