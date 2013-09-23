define([
  'common/utils/ssnValidator',
  'common/utils/orgNumberValidator',
  'common/models/customerType'
  ],


  function(SSNValidator, OrgNumberValidator, CUSTOMER_TYPE) {

    var Directive = function() {

      var detectCustomerType = function(customerid) {
        if (!customerid) {
          return CUSTOMER_TYPE.PRIVAT;
        }
        else {
          switch (customerid.length) {
            case 9:
              return CUSTOMER_TYPE.ORG;
            case 11:
              return CUSTOMER_TYPE.PRIVAT;
            default:
              return CUSTOMER_TYPE.PRIVAT;
          }
        }
      };

      function getValidOrgNumber(value) {
        if (OrgNumberValidator.validate(value)) {
          return value;
        }
        return undefined;
      }

      function getValidFodselsnummer(value) {
        if (SSNValidator.validate(value)) {
          return value;
        }
        return undefined;
      }

      return {
        restrict: "C",
        require: 'ngModel',
        scope : {
          ngModel : "=",
          customerType : "=",
          fodselsnummer: "=",
          orgnummer: "="
        },

        link: function(scope, elem, attrs, ctrl) {

          elem.on("change", function() {
            var value = elem.val().replace(/\D/g, ''); // Remove all non numeric chars
            scope.customerType = detectCustomerType(value);
            elem.val(value);
            scope.ngModel = value;

            scope.$apply(function() {
              switch (scope.customerType) {
                case CUSTOMER_TYPE.ORG:
                  scope.orgnummer = getValidOrgNumber(value);
                  scope.fodselsnummer = undefined;
                  break;
                case CUSTOMER_TYPE.PRIVAT:
                  scope.orgnummer = undefined;
                  scope.fodselsnummer = getValidFodselsnummer(value);
                  break;
                default:
                  scope.orgnummer = undefined;
                  scope.fodselsnummer = undefined;
                  break;
              }
            });
          });

          scope.$watch("ngModel", function() {
            elem.val(scope.ngModel);
            scope.customerType = detectCustomerType(scope.ngModel);
          });

          elem.bind('blur', function() {
            scope.$apply(function () {
              if (!scope.customerType && elem.val().length === 0) {
                ctrl.$setValidity('customerid', true);
                ctrl.$setValidity('orgnummer', true);
                ctrl.$setValidity('fodselsnummer', true);
              }
              else if (scope.customerType === CUSTOMER_TYPE.ORG) {
                if (OrgNumberValidator.validate(elem.val())) {
                  ctrl.$setValidity('customerid', true);
                  ctrl.$setValidity('orgnummer', true);
                  ctrl.$setValidity('fodselsnummer', true);
                } else {
                  ctrl.$setValidity('customerid', true);
                  ctrl.$setValidity('orgnummer', false);
                  ctrl.$setValidity('fodselsnummer', true);
                }
              }
              else if (scope.customerType === CUSTOMER_TYPE.PRIVAT) {
                if (SSNValidator.validate(elem.val())) {
                  ctrl.$setValidity('customerid', true);
                  ctrl.$setValidity('fodselsnummer', true);
                  ctrl.$setValidity('orgnummer', true);
                } else if (elem.val().length === 11) {
                  ctrl.$setValidity('customerid', true);
                  ctrl.$setValidity('fodselsnummer', false);
                  ctrl.$setValidity('orgnummer', true);
                } else {
                  ctrl.$setValidity('customerid', false);
                  ctrl.$setValidity('fodselsnummer', true);
                  ctrl.$setValidity('orgnummer', true);
                }
              } else {
                ctrl.$setValidity('customerid', false);
                ctrl.$setValidity('orgnummer', true);
                ctrl.$setValidity('fodselsnummer', true);
              }
            });
          });


          ctrl.$parsers.unshift(function(viewValue) {
            if(!viewValue) {
              ctrl.$setValidity('customerid', true);
              ctrl.$setValidity('orgnummer', true);
              ctrl.$setValidity('fodselsnummer', true);
              return viewValue;
            } else if(viewValue.length === 9) {
              if(OrgNumberValidator.validate(viewValue)) {
                ctrl.$setValidity('customerid', true);
                ctrl.$setValidity('orgnummer', true);
                ctrl.$setValidity('fodselsnummer', true);
                return viewValue;
              } else {
                return undefined;
              }
            } else if(viewValue.length === 11) {
              if(SSNValidator.validate(viewValue)) {
                ctrl.$setValidity('customerid', true);
                ctrl.$setValidity('fodselsnummer', true);
                ctrl.$setValidity('orgnummer', true);
                return viewValue;
              } else {
                return undefined;
              }
            } else {
              return undefined;
            }

          });
        }
      };
    };

    return Directive;
  }
);