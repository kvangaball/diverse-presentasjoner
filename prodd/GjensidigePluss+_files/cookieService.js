define([
  'common/commonModule'
],

  function () {

    var Service = function() {

      var path          = '/';
      var cookiePrefix  = 'gjensidigePluss.';

      return {

          createCookie : function(name, value, hours) {
            var expires = "";
            if (hours) {
              var date = new Date();
              date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
              expires = "; expires="+date.toGMTString();
            }
            document.cookie = cookiePrefix + name + "=" + value + expires + "; path=" + path;
          },

          readCookie : function(name) {
            var nameEQ = cookiePrefix + name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') c = c.substring(1,c.length);
              if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
          },

          eraseCookie : function(name) {
            createCookie(cookiePrefix + name,"",-1);
          }

        };

    };

    Service.$inject = [];

    return Service;

});