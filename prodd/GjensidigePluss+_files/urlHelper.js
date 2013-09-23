define([
  'common/commonModule'
],

  function () {

    angular.module("common").factory('urlHelper',

      function () {

        var service = {
          getParameter : function(key) {
            try {
              return window.location.search.match(new RegExp("(\\?|&)" + key + "(\\[\\])?=([^&]*)"))[3];
            } catch (e) {
              return null;
            }
          }
        };

        return service;
      }
    );

  });
