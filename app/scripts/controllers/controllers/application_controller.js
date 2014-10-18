Pecan.ApplicationController = Ember.Controller.extend({
  actions: {
    logout: function() {
      this.transitionToRoute('logout');
    }
  }
});
