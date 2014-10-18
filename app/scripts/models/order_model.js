Pecan.OrderHeader = DS.Model.extend({
  id: DS.attr('string'),
  orderNumber: DS.attr('number'),
  user: DS.belongsTo('user'),
  // billing address info
  b_addr1: DS.attr('string'),
  b_addr2: DS.attr('string'),
  b_city: DS.attr('string'),
  b_ZIP: DS.attr('string'),
  b_state: DS.attr('string'),
  b_country: DS.attr('string'),
  b_phone: DS.attr('string'),
  // shipping address info
  s_addr1: DS.attr('string'),
  s_addr2: DS.attr('string'),
  s_city: DS.attr('string'),
  s_ZIP: DS.attr('string'),
  s_state: DS.attr('string'),
  s_country: DS.attr('string'),
  s_phone: DS.attr('string'),
});


Pecan.OrderDetails = DS.Model.extend({
  id: DS.attr('string'),
  orderHeaderID: DS.belongsTo('orderHeader'),
  productID: DS.belongsTo('product'),
  packageType: DS.attr('string'),
  qty: DS.attr('number'),
  qtyCase: DS.attr('number')
});
