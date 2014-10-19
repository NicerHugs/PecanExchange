Pecan.CheckoutController = Ember.ObjectController.extend({
  actions: {
    placeOrder: function() {
      this.get('model').save();
    }
  }
});
