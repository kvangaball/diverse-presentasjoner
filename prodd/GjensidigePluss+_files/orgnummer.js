define(['common/utils/orgNumberValidator'], function(orgNumberValidator) {

  var Directive = function() {

    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        elem.bind('blur', function() {
          scope.$apply(function () {
            if (!elem.val() || orgNumberValidator.validate(elem.val())) {
              ctrl.$setValidity('orgnummer', true);
            } else {
              ctrl.$setValidity('orgnummer', false);
            }
          });
        });

        ctrl.$parsers.unshift(function(viewValue) {
          if (!viewValue || orgNumberValidator.validate(viewValue)) {
            ctrl.$setValidity('orgnummer', true);
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