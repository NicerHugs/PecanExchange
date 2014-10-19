Pecan.ProductController = Ember.ObjectController.extend({
  selectedOptionPrice: '0.00',
  reviewCount: function() {
    return this.get('reviews').length;
  }.property('reviews'),
});
