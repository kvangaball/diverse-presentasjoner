define(['text!assets/json/products.json'],

  function(products) {

    var Service = function() {
      var data = JSON.parse(products);

      return {
        leasingId     : 'LEASING',
        loanId        : 'LAN',
        products      : data.loanProducts,
        km_per_year   : data.km_per_year,

        getLoanProduct : function() {
          return this.products[0];
        },

        getLeasingProduct : function() {
          return this.products[1];
        },

        isLeasing : function(product) {
          return product && product.key == this.leasingId;
        }
      };
    };

    Service.$inject = [];

    return Service;

  }

);