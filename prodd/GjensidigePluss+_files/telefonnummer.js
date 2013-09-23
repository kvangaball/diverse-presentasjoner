define(function() {

  var Directive = function() {

    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        var pattern = new RegExp(attrs.telefonnummer.substr(1, attrs.telefonnummer.length - 2));

        elem.bind('blur', function() {
          scope.$apply(function () {
            if (!elem.val() || pattern.test(elem.val())) {
              ctrl.$setValidity('telefonnummer', true);
            } else {
              ctrl.$setValidity('telefonnummer', false);
            }
          });
        });

        ctrl.$parsers.unshift(function(viewValue) {
          if (pattern.test(viewValue)) {
            ctrl.$setValidity('telefonnummer', true);
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