Pecan.CheckoutController = Ember.ObjectController.extend({
  product: {},
  actions: {
    placeOrder: function() {
      this.get('model').save();
    }
  }
});
