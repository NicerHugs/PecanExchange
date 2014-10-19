Pecan.ProductIndexRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('parentController').get('model');
  },
});
