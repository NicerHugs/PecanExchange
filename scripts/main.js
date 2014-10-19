window.Pecan = Ember.Application.create();

DS.RESTAdapter.reopen({
  host: 'http://pecanexchange.com'
});

Pecan.ApplicationAdapter = DS.RESTAdapter.extend({});

Pecan.Router.map(function() {
  this.route("login");
  this.route("logout");

  // market shows all available products and allows buyers to filter/sort/search
  this.resource("market", function() {
    this.resource("product", { path: "/:product_id" }, function() {
      // grower edits details of product listing.
      this.route("edit");
      this.route("reviews");
    });
  });

  // list of growers
  this.resource("growers", function() {
    // grower profile, displays all their farm info to personalize them, also has their listings
    this.resource("grower", { path: "/:grower_id" }, function() {
      // grower adds/deletes products and edits general profile info
      this.route("edit");
      this.route("reviews");
    });
  });



  // checkout allows user to make purchase, displays their order, allows for
  // order editing
  this.route("checkout");
});

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


Pecan.MarketContoller = Ember.ArrayController.extend({

});

Pecan.ProductIndexController = Ember.ObjectController.extend({
  needs: 'application',
  actions: {
    addToCart: function() {
      var orderItem = this.store.createRecord('orderDetail',
        {id: 'orderItem' + Date.now()});
      var order = this.get('controllers.application.order');
      order.set('orderItems', orderItem.get('id'));
      console.log(order);
    }
  }
});

Pecan.ProductController = Ember.ObjectController.extend({
  selectedOptionPrice: '0.00',
  reviewCount: function() {
    return this.get('reviews').length;
  }.property('reviews'),
});

Pecan.CheckoutController = Ember.ObjectController.extend({
  actions: {
    placeOrder: function() {
      this.get('model').save();
    }
  }
});

Pecan.Order = DS.Model.extend({
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
  orderItems: DS.attr('string')
});


Pecan.OrderDetail = DS.Model.extend({
  orderID: DS.belongsTo('order'),
  productID: DS.belongsTo('product'),
  optionID: DS.attr('string'),
  qty: DS.attr('number'),
  qtyCase: DS.attr('number')
});

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

Pecan.Option = DS.Model.extend({
  name: DS.attr('string'),
  retailPrice: DS.attr('number')
});


Pecan.GrowerRoute = Ember.Route.extend({
  model: function(params) {
  return this.store.find('user', params.user_id);
  },
});

Pecan.MarketRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('product');
  },
});
  

Pecan.CheckoutRoute = Ember.Route.extend({
  model: function() {
    return this.controllerFor('application').get('order');
  },
});

Pecan.ProductRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('product', params.product_id);
  },
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Our Mission");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Browse Growers");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Shop Farm Direct Pecans");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <i class=\"fa fa-shopping-cart\"></i>\n        ");
  stack1 = helpers['if'].call(depth0, "order.orderItems", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\n          <div class=\"cart-count\">1</div>\n        ");
  }

function program10(depth0,data) {
  
  
  data.buffer.push("Terms and Conditions");
  }

function program12(depth0,data) {
  
  
  data.buffer.push("Privacy");
  }

function program14(depth0,data) {
  
  
  data.buffer.push("Search Pecans");
  }

function program16(depth0,data) {
  
  
  data.buffer.push("Growers");
  }

function program18(depth0,data) {
  
  
  data.buffer.push("My Profile");
  }

function program20(depth0,data) {
  
  
  data.buffer.push("Account Details");
  }

  data.buffer.push("\n<div class=\"container\">\n  <header>\n    <div class=\"logo\">\n      <img src=\"images/Logo.png\">\n    </div>\n    <nav>\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "growers", options) : helperMissing.call(depth0, "link-to", "growers", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "market", options) : helperMissing.call(depth0, "link-to", "market", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "checkout", options) : helperMissing.call(depth0, "link-to", "checkout", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    </nav>\n  </header>\n\n  <main>\n    ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </main>\n\n  <footer>\n    <div class=\"logo\">\n      <img src=\"images/Logo-NoTag.png\">\n      <p>&copy; Pecan Exchange 2014</p>\n      <p>All Rights Reserved</p>\n    </div>\n    <ul>\n      <h4>Company</h4>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n    </ul>\n    <ul>\n      <h4>Browse</h4>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "market", options) : helperMissing.call(depth0, "link-to", "market", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "growers", options) : helperMissing.call(depth0, "link-to", "growers", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n    </ul>\n    <ul>\n      <h4>Account</h4>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n      <li>\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </li>\n    </ul>\n    <ul>\n      <h4>Contact</h4>\n      <li>\n        411 University Ridge,\n      </li>\n      <li>\n        Greenville, SC 29607\n      </li>\n    </ul>\n  </footer>\n</div><!--container-->\n");
  return buffer;
  
});
Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Shop Farm Direct Pecans");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Build Your Custom Farm Store");
  }

  data.buffer.push("\n<div class=\"index-header\">\n<h1>The Platform For Farmer-Direct Pecans</h1>\n");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "market", options) : helperMissing.call(depth0, "link-to", "market", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n<section class=\"tag\">\n  <h3>Buy Farm-Direct Pecans At Up 60% Less Than Market Cost</h3>\n  <span>We eliminate layers in the supply chain - maximizing income for the farmer and lowering costs for the buyer. </span>\n</section>\n\n<div class=\"index-content\">\n  <div class=\"index-copy copy-1\">\n  <h4>Transforming the supply chain</h4>\n  <p>\n    The Pecan Exchange platform gives farmers direct access to the buyers for their crop, allowing them to have a larger share of the revenue. By being closer to the consumer, the farmer captures added value from his crop to support his family and community, while also investing in the future.\n  </p>\n  </div>\n\n  <section class=\"about-us\">\n    <h2>About Us</h2>\n    <p>Pecan Exchange is transforming the pecan supply chain through an innovative online platform that connects buyers directly with pecan farmers.  We eliminate layers in the supply chain - maximizing income for the farmer and lowering costs for the buyer.  </p>\n    <img src=\"\">\n    <h4>How do farmers benefit?</h4>\n    <p>Farmers normally receive only a small percentage of the value their crop generates. The farmer typically loses ownership in the earliest stage of this process. Pecan Exchange allows farmers to maintain ownership all  the way through the end sales, allowing them to have a larger share in the revenue generated.</p>\n    <img src=\"\">\n    <h4>How do retailers benefit?</h4>\n    <p>\n      Pecan Exchange approach is trending business model in today’s world. More often than not, consumers are demanding more from the companies that are receiving their hard earned money.  Pecan Exchange’s farmer-direct platform allows our customers to know each farmer’s story.  And customers appreciate these stories.\n    </p>\n    <img src=\"\">\n    <h4>How do consumers benefit?</h4>\n    <p>\n      Through Pecan Exchange, pecan lovers have a access to pecans from premier growers throughout the USA – at prices comparable to mass-produced pecans. Best of all, pecan lovers get to “know who grows” their favorite pecan pie.\n    </p>\n  </section>\n\n  <div class=\"index-copy copy-2\">\n    <h4>Transforming the supply chain</h4>\n    <p>\n      The Pecan Exchange platform gives farmers direct access to the buyers for their crop, allowing them to have a larger share of the revenue. By being closer to the consumer, the farmer captures added value from his crop to support his family and community, while also investing in the future.\n    </p>\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "login", options) : helperMissing.call(depth0, "link-to", "login", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n</div>\n");
  return buffer;
  
});
Ember.TEMPLATES["market"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("\n<div class=\"main-header\">\n  <h1>Browse Pecans</h1>\n</div><!--main-header-->\n\n<section class=\"content\">\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n");
  return buffer;
  
});
Ember.TEMPLATES["market/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("\n\n<section class=\"sidebar\">\n  ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "sidebar", options) : helperMissing.call(depth0, "partial", "sidebar", options))));
  data.buffer.push("\n</section>\n<section class=\"products\">\n  ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "products", options) : helperMissing.call(depth0, "partial", "products", options))));
  data.buffer.push("\n</section>\n");
  return buffer;
  
});
Ember.TEMPLATES["product"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("\n\n<section class=\"product-view\">\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n");
  return buffer;
  
});
Ember.TEMPLATES["product/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  data.buffer.push("\nedit product template\n");
  return buffer;
  
});
Ember.TEMPLATES["product/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("&#60;&#60;Back");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("reviews");
  }

  data.buffer.push("\n\n<ul class=\"product-nav\">\n  <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n</ul>\n\n<div class='detail-view-left'>\n  <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("pic")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n</div>\n\n<div class=\"detail-view-right\">\n  <div class=\"product-header\">\n    <div class=\"product-title\">\n      <h2 class=\"title\">");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n      <h2 class=\"price\">$");
  stack1 = helpers._triageMustache.call(depth0, "retailPrice", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("/LB</h2>\n    </div>\n    <p>");
  stack1 = helpers._triageMustache.call(depth0, "userID.username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<span>(30 miles from Greenville, SC)</span></p>\n  </div>\n\n  <div class=\"product-description\">\n    <h4>Product Description</h4>\n    <p>");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n  </div>\n\n  <div class=\"product-reviews\">\n    <h4>Reviews</h4>\n    <p>");
  stack1 = helpers._triageMustache.call(depth0, "rating", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" stars\n      ");
  stack1 = helpers._triageMustache.call(depth0, "countRating", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "product.reviews", "userID", options) : helperMissing.call(depth0, "link-to", "product.reviews", "userID", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </p>\n  </div>\n\n  <div class=\"product-quantity\">\n    <h4>Quantity</h4>\n    <form class=\"add-to-cart\">\n      ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("options"),
    'optionValuePath': ("content.id"),
    'optionLabelPath': ("content.description"),
    'prompt': ("Select an option"),
    'value': ("option")
  },hashTypes:{'content': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'prompt': "STRING",'value': "ID"},hashContexts:{'content': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'prompt': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n      <input type=\"submit\" value=\"Add to Cart\"");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addToCart", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n      <span class=\"total-price\">$");
  stack1 = helpers._triageMustache.call(depth0, "selectedOptionPrice", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n\n    </form>\n\n  </div>\n</div>\n");
  return buffer;
  
});
Ember.TEMPLATES["checkout"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression;


  data.buffer.push("\n<div class=\"main-header\">\n  <h1>Shopping Cart</h1>\n</div><!--main-header-->\n\n<section class=\"content\">\n  <div class=\"shopping-cart\">\n    <div class=\"table-heading\">\n      <div class=\"product-name\">\n        Product\n      </div>\n      <div class=\"farm-name\">\n        Farm\n      </div>\n      <div class=\"product-price\">\n        Price\n      </div>\n      <div class=\"product-option\">\n        Qty.\n      </div>\n      <div class=\"product-total\">\n        Total\n      </div>\n    </div>\n    \n    <div class=\"table-row\">\n      <div class=\"product-name\">\n        ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </div>\n      <div class=\"farm-name\">\n        Farm\n      </div>\n      <div class=\"product-price\">\n        Price\n      </div>\n      <div class=\"product-option\">\n        Qty.\n      </div>\n      <div class=\"product-total\">\n        Total\n      </div>\n    </div>\n    \n  </div>\n\n  <div class=\"user-data\">\n    <div class=\"name\">\n    <label name=\"first-name\" class=\"first-name\"><h4>First name</h4>\n      <input type='text' name=\"first-name\" class=\"first-name\"></input>\n    </label>\n    </div>\n    <div class=\"name\">\n    <label name=\"last-name\" class=\"last-name\"><h4>Last name</h4>\n      <input type='text' name=\"last-name\" class=\"last-name\"></input>\n    </label>\n    </div>\n    <div class=\"name\">\n    <label name=\"company-name\" class=\"company-name\"><h4>Company</h4>\n      <input type='text' name=\"company-name\" class=\"compnay-name\"></input>\n    </label>\n    </div>\n    <div class=\"address\">\n    <label name=\"address\" class=\"address-\"><h4>Address</h4>\n      <input type='text' name=\"address\" class=\"address-\"></input>\n    </label>\n    </div>\n    <div class=\"zip\">\n    <label name=\"address\" class=\"address-\"><h4>Zip</h4>\n      <input type='text' name=\"address\" class=\"address-\"></input>\n    </label>\n    </div>\n    <div class=\"country\">\n    <label name=\"address\" class=\"address-\"><h4>Country</h4>\n      <input type='text' name=\"address\" class=\"address-\"></input>\n    </label>\n    </div>\n    <div class=\"phone\">\n    <label name=\"address\" class=\"address-\"><h4>Phone</h4>\n      <input type='text' name=\"address\" class=\"address-\"></input>\n    </label>\n    </div>\n    <div class=\"zip\">\n    <label name=\"address\" class=\"address-\"><h4>Email Address</h4>\n      <input type='text' name=\"address\" class=\"address-\"></input>\n    </label>\n    </div>\n  </div>\n\n  <input type=\"button\" class=\"checkout-button\" value=\"Check Out\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "placeOrder", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n</section>\n");
  return buffer;
  
});
Ember.TEMPLATES["product"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("\n\n<section class=\"product-view\">\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n");
  return buffer;
  
});
Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  data.buffer.push("\nlogin template\n");
  return buffer;
  
});
Ember.TEMPLATES["logout"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  data.buffer.push("\nlogout template\n");
  return buffer;
  
});
Ember.TEMPLATES["grower/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  data.buffer.push("\nedit grower template\n");
  return buffer;
  
});
Ember.TEMPLATES["grower/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("grower index template\n");
  
});
Ember.TEMPLATES["_products"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n  <div class=\"item-view\">\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "product", "id", options) : helperMissing.call(depth0, "link-to", "product", "id", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("pic")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\n    <div>\n      <h4>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n      <h4 class=\"price\">$");
  stack1 = helpers._triageMustache.call(depth0, "retailPrice", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("/LB</h4>\n    </div>\n    <p>");
  stack1 = helpers._triageMustache.call(depth0, "userID.username", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n    <span>(30 miles)</span>\n    ");
  return buffer;
  }

  data.buffer.push("\n\n");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["_sidebar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<h4>\n  Closest to My Location\n</h4>\n");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("location")
  },hashTypes:{'value': "ID"},hashContexts:{'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n\n<ul>\n  <h4>Packaging</h4>\n  <li>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'name': ("shelled"),
    'checked': ("isShelled")
  },hashTypes:{'type': "STRING",'name': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'name': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <label name=\"shelled\">Shelled</label>\n  </li>\n  <li>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'name': ("unshelled"),
    'checked': ("isUnshelled")
  },hashTypes:{'type': "STRING",'name': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'name': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <label name=\"unshelled\">Unshelled</label>\n  </li>\n  <li>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'name': ("packaged"),
    'checked': ("isPackaged")
  },hashTypes:{'type': "STRING",'name': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'name': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <label name=\"packaged\">Packaged</label>\n  </li>\n</ul>\n\n\n<ul>\n  <h4>Variety</h4>\n  <li>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'name': ("variety1"),
    'checked': ("variety1")
  },hashTypes:{'type': "STRING",'name': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'name': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <label name=\"variety1\">Variety 1</label>\n  </li>\n  <li>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'name': ("variety2"),
    'checked': ("variety2")
  },hashTypes:{'type': "STRING",'name': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'name': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <label name=\"variety2\">Variety 2</label>\n  </li>\n  <li>\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'name': ("variety3"),
    'checked': ("variety3")
  },hashTypes:{'type': "STRING",'name': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'name': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    <label name=\"variety3\">Variety 3</label>\n  </li>\n</ul>\n");
  return buffer;
  
});