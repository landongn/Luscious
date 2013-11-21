export default Ember.Route.extend({
  model: function() {
    return [];
  },
  renderTemplate: function () {
    this.render('scene/index', {
      into: 'scene/base'
    });
  }
});
