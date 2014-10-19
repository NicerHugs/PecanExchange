Pecan.ApplicationController = Ember.Controller.extend({
  init: function() {
    this._super();
    var order = this.store.createRecord('order', {
      id: 'order' + Date.now()
    });
    this.set('order', order);
  },
  productSelected: function() {
    var product = (this.store.find('product',
      this.get('order').get('orderItems'))
      .then(function(data) {
        return data;
      }));
    console.log(product);
    return product;
  }.property('order'),
  actions: {
    logout: function() {
      this.transitionToRoute('logout');
    }
  }
});
