define([
  'lib/accounting/accounting'
  ],

  function(accounting) {

    var Directive = function($timeout) {

      function formatDecimals(elem, decimal) {
        if(elem.val()){
          elem.val(accounting.toFixed(elem.val(), decimal));
        }
      }

      function formatValue(value, decimal) {
        if (value) {
          return accounting.toFixed(value, decimal);
        }
        return "";
      }

      function normalizeNumber(number) {
        if (number) {
          return parseFloat(("" + number).replace(",", "."), 10);
        }
        return "";
      }

      return {
        require: 'ngModel',
        scope: {
          ngModel: "=ngModel",
          modelToUpdate: "=",
          ngChange: "&"
        },

        link: function(scope, elem, attrs, ctrl) {
          var decimal = attrs.decimalInput ? attrs.decimalInput : 0;
          var selfTriggerdUpdate = false;

          function changed() {
            if (scope.ngChange) {
              $timeout(function() {
                scope.ngChange();
              });
            }
          }

          function updateModel(value, oldValue, ctrl) {
            if (value === undefined) { // Return if no value in call
              return;
            }
            selfTriggerdUpdate = true;
            value = normalizeNumber(value);
            if (!isNaN(value)) {
              scope.modelToUpdate = value;
            } else {
              scope.modelToUpdate = 0;
            }
            changed();
          }

          function updateViewModel(val) {
            if (!selfTriggerdUpdate) {
              elem.val(val);
              formatView();
            }
            selfTriggerdUpdate = false;
          }

          function formatView() {
            if (elem.val() !== "") {
              var value = normalizeNumber(elem.val());
              elem.val(accounting.formatNumber(value, 2));
            } else {
              elem.val("");
              updateModel("");
            }
            selfTriggerdUpdate = false;
          }

          if (attrs['modelToUpdate']) {
            // Update model on change
            scope.$watch(attrs['ngModel'], updateModel);
            scope.$watch('modelToUpdate', updateViewModel);
          }

          elem.on("blur", formatView);

        }
      };

    };

    Directive.$inject=['$timeout'];

    return Directive;

  }

);