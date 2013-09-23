define([], function() {

  // Must match g24 config page keys set in enonic on page properties 
  var PAGEKEYS = {
    'SOKNAD' : 'soknad',
    'SOKNADSOVERSIKT' : 'soknadsoversikt'
  };

  var Service = function() {
    return {
      getApplicationsLink: function(id) {
        return g24config.urls[PAGEKEYS.SOKNAD] + "?soknadid=" + id;
      },
      gotoEAI: function() {
          window.location.href = "/eai";
      },
      gotoApplication: function(id) {
        if (id) {
          window.location.href = g24config.urls[PAGEKEYS.SOKNAD] + "?soknadid=" + id;
        } else {
          window.location.href = g24config.urls[PAGEKEYS.SOKNAD];
        }
      },
      gotoApplicationsPage : function() {
        window.location.href = g24config.urls[PAGEKEYS.SOKNADSOVERSIKT];
      }
    };
  };

  Service.$inject = [];

  return Service;

});
