Pecan.IndexContoller = Ember.ArrayController.extend({
  queryParams: ['location'],
  category: null,

  filteredProducts: function() {
    var location = this.get('location');
    var products = this.get('model');

    if (category) {
      return products.filterBy('location', location);
    } else {
      return products;
    }
  }.property('location', 'model')
});
