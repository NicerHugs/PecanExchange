Pecan.Listing = DS.Model.extend({
  id: DS.attr('string'),
  SKU: DS.attr('string'),
  //quantity is in a standard unit - pounds?
  quantity: DS.attr('number'),
  price: DS.attr('number'),
  growerID: DS.belongsTo('user'),
  variety: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string')
});
