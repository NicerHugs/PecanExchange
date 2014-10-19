window.Pecan = Ember.Application.create();

DS.RESTAdapter.reopen({
  host: 'http://pecanexchange.com'
});

Pecan.ApplicationAdapter = DS.RESTAdapter.extend({});
