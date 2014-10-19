Pecan.Product = DS.Model.extend({
  SKU: DS.attr('string'),
  quantity: DS.attr('number'),
  retailPrice: DS.attr('string'),
  userID: DS.belongsTo('user'),
  variety: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  pic: DS.attr('string'),
  qtyCase: DS.attr('number'),
  options: DS.hasMany('option'),
  rating: DS.attr('number'),
  countRating: DS.attr('number'),
});
