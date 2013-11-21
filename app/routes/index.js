export default Ember.Route.extend({
  beforeModel: function () {
    this.redirect('scene.loading');
  }
});
