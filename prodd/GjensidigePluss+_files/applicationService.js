define(function() {


  var ApplicationService = function($resource, $q, resourceService, errorService) {

    var SoknadResource = $resource(resourceService.getSecurePath('soknad/:id', 'soknad'));
    var ConfigResource = $resource(resourceService.getSecurePath('config'));

    return {

      getConfig: function(errorHandler) {
        var deferred = $q.defer();

        ConfigResource.get({},
          {
            requestKey:   'applicationService.getConfig',
            errorHandler: errorHandler
          },
          function (response) {
            deferred.resolve(response);
          }
        );

        return deferred.promise;
      },

      sjekkKredittverdighet: function(fnr){
        return KreditSjekkResource.get({fnr: fnr});
      },

      isLeasing: function(soknad) {
        return soknad && soknad.leasing;
      },

      saveApplication : function(soknad, errorHandler){
        var deferred = $q.defer(),
            errorObject = {
              requestKey:   '.applicationServicesaveApplication',
              errorHandler: errorHandler
            };

        SoknadResource.save(soknad,
          function (response) {
            deferred.resolve(response);
          },
          function (response) {
            response.config.data = errorObject;
            errorService.handleError(response);
            deferred.reject(response);
          }
        );

        return deferred.promise;
      },

      getApplication : function(id, errorHandler){
        var deferred = $q.defer();

        SoknadResource.get({ id: id },
          {
            requestKey:   'applicationService.getApplication',
            errorHandler: errorHandler
          },
          function (response) {
            deferred.resolve(response);
          }
        );

        return deferred.promise;
      }
    };

  };

  ApplicationService.$inject = ['$resource', '$q', 'resourceService', 'errorService'];

  return ApplicationService;

});