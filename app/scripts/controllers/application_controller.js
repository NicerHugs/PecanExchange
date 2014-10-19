Pecan.ApplicationController = Ember.Controller.extend({
  init: function() {
    this._super();
    var order = this.store.createRecord('order', {
      id: 'order' + Date.now()
    });
    this.set('order', order);
  },
  actions: {
    logout: function() {
      this.transitionToRoute('logout');
    }
  }
});
