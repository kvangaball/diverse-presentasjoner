define(function() {

  var Directive = function() {

    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        var pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

        elem.bind('blur', function() {
          scope.$apply(function () {
            if (!elem.val() || pattern.test(elem.val())) {
              ctrl.$setValidity('epost', true);
            } else {
              ctrl.$setValidity('epost', false);
            }
          });
        });

        ctrl.$parsers.unshift(function(viewValue) {
          if (pattern.test(viewValue)) {
            ctrl.$setValidity('epost', true);
            return viewValue;
          } else {
            return '';
          }
        });
      }
    };
  };

  return Directive;

});