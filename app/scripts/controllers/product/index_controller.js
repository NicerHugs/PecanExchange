Pecan.ProductIndexController = Ember.ObjectController.extend({
  needs: 'application',
  actions: {
    addToCart: function() {
      var orderItem = this.store.createRecord('orderDetail',
        {id: 'orderItem' + Date.now()});
      var order = this.get('controllers.application.order');
      order.set('orderItems', orderItem.get('id'));
      console.log(order);
    }
  }
});
