define(['common/utils/ssnValidator'],  function(SSNValidator) {

  var Directive = function() {

    return {
      restrict: "A",
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        elem.bind('blur', function() {
          scope.$apply(function () {
            if (!elem.val() || SSNValidator.validate(elem.val())) {
              ctrl.$setValidity('fodselsnummer', true);
            } else {
              ctrl.$setValidity('fodselsnummer', false);
            }
          });
        });

        ctrl.$parsers.unshift(function(viewValue) {
          if (!viewValue || SSNValidator.validate(viewValue)) {
            ctrl.$setValidity('fodselsnummer', true);
            return viewValue;
          } else {
            return undefined;
          }
        });
      }
    };
  };

  return Directive;

});