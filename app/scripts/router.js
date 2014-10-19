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
