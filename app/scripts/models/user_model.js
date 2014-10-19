Pecan.User = DS.Model.extend({
  // buyer or seller?
  acctType: DS.attr('string'),
  username: DS.attr('string'),
  email: DS.attr('string'),
  products: DS.hasMany('product'),
  // avatar / profile pic
  pic: DS.attr('string'),
  // farmer story/bio
  story: DS.attr('string'),
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
