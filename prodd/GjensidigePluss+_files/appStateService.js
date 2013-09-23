define(function() {

  var Service = function() {
    return {
      pageState : {
        disabled : false
      },

      disablePage : function(flag) {
        this.pageState.disabled = flag;
      }
    };

  };

  Service.$inject = [];

  return Service;

});