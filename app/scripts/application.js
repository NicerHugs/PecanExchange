window.Pecan = Ember.Application.create();

Pecan.Store = DS.Store.extend({
  revision: 11,
  url: "http://www.pecanexchange.com"
});
