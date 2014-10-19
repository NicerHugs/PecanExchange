Pecan.ProductIndexController = Ember.ObjectController.extend({
  needs: ['application', 'checkout'],
  actions: {
    addToCart: function() {
      var orderItem = this.store.createRecord('orderDetail',
        {id: 'orderItem' + Date.now()});
      var order = this.get('controllers.application.order');
      order.set('orderItems', orderItem.get('id'));
      this.get('controllers.checkout').set('product', this.get('model'));
      console.log(this.get('controllers.checkout.product'));
    }
  }
});
