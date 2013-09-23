define(function() {

  var DraftService = function($resource, $http, $q, resourceService, storageService) {

    // var userToken;
    // var loadDraft = true;

    var DraftResource         = $resource(resourceService.getPath('storage'));
    var DraftSecureResource   = $resource(resourceService.getSecurePath('storage'));
    var TokenResource         = $resource(resourceService.getSecurePath('token'));

    var getUserToken = function() {
      var deferred = $q.defer();
      TokenResource.get({},
        {
          requestKey:     'draftService.getToken'
        },
        function (response) {
          deferred.resolve(response);
        },
        function (error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

    //Dette er jQuery http i stedet for angular. Hvis man kjører
    //angular med dette deferred apiet, så fungerer ikke setTimeout riktig i
    //throttle/debounce-logikken slik at funksjonen kjører set setInterval.
    var saveDraft = _.debounce(function(draft, userToken, success, error) {
        if (userToken) {
          $.ajax({
            type: "POST",
            async: true,
            url: resourceService.getPath('storage'),
            beforeSend: function (request)
            {
              request.setRequestHeader("X-REQUESTED-BY", userToken);
            },
            data: JSON.stringify(draft),
            success: success,
            error: error
          });
        }
      }, 500
    );


    var userToken,
        isMobile = false;

    return {

      timestamp: null,
      lastSave : null,

      init : function() {
        var deferred = $q.defer();

        if (isMobile) {
          userToken = storageService.getUser();
          deferred.resolve();
        } else {
          getUserToken().then(function(result) {
            userToken = result.token;
            deferred.resolve();
          });
        }

        return deferred.promise;
      },

      mobile : function(flag) {
        isMobile = flag;
      },

      getDraft : function() {
        if (isMobile) {
          return null;
        }
        var deferred = $q.defer();
        DraftSecureResource.get({},
          {
            requestKey:   'draftService.getDraft'
          },
          function(response) {
            deferred.resolve(response);
          },
          function (error) {
            deferred.reject(error);
          }
        );
        return deferred.promise;
      },

      save: function(draft, soknadstype, callback) {
        if (userToken) {
          var that = this;

          if (soknadstype) {
            draft.soknadstype = soknadstype;
          }

          saveDraft(draft, userToken, function(response, status) {
            that.timestamp = new Date();
            that.lastSave = {
              timestamp: new Date(),
              status: status
            };
            if (callback) {
              callback.call(that.lastSave);
            }
          });
        }
      }

    };
  };

  DraftService.$inject = ['$resource', '$http', '$q', 'resourceService', 'storageService'];

  return DraftService;

});