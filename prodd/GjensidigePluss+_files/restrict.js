define(function() {

  var Directive = function($parse) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, iElement, iAttrs, controller) {
        if (iAttrs.restrict) {
          var expr = new RegExp(iAttrs.restrict);

          $(iElement).on("keydown", function (evt) {
            if (evt.keyCode < 48) {
              return true;
            }
            if (!evt.shiftKey && !evt.altKey) {
              if (expr.test(String.fromCharCode(evt.keyCode))) {
                return true;
              }
            }
            evt.stopPropagation();
            evt.preventDefault();
            return false;
          });
        }
      }
    };
  };

  Directive.$inject = ['$parse'];

  return Directive;

});