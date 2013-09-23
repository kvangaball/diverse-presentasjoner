define(function() {

  var ResourceService = function($location) {

    var LocalPath =  '/_public/gjensidigePluss/mock-data/';
    var ServerPath = '/forhandler-web/0/';
    var SecureServerPath = '/forhandler-web/1/';
    var MinBilPath = 'forhandler-web/minbil/';

    // Set to true if mock data is to be used 
    var useMockData = false;

    function isLocalhost() {
      return $location.absUrl().indexOf('localhost') >= 0;
    }

    return {

      getPath : function(resourceName, localFileName) {
        if (useMockData && isLocalhost()) {
          return LocalPath + (localFileName ? localFileName : resourceName) + '.json';
        } else {
          return ServerPath + resourceName;
        }
      },
      getSecurePath : function(resourceName, localFileName) {
        if (useMockData && isLocalhost()) {
          return LocalPath + (localFileName ? localFileName : resourceName) + '.json';
        } else {
          return SecureServerPath + resourceName;
        }
      },
      getMinBilPath : function(resourceName, localFileName) {
        if(useMockData && isLocalhost()) {
          return LocalPath + (localFileName ? localFileName : resourceName) + '.json';
        } else {
          return MinBilPath + resourceName;
        }
      }


    };

  };

  ResourceService.$inject = ['$location'];

  return ResourceService;

});
