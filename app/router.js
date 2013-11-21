var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');

  this.resource('scene', {path: '/scene'}, function() {
    this.route('index');
    this.route('loading');
    this.route('cube');
    this.route('plane');
  });
});

Router.reopen({
  location: 'history'
});

export default Router;
