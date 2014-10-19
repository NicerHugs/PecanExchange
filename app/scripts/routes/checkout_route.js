Pecan.CheckoutRoute = Ember.Route.extend({
  model: function() {
    return this.controllerFor('application').get('order');
  },
});
