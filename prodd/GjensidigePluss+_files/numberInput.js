define([
  'lib/accounting/accounting'
  ],

  function(accounting) {

    var Directive = function() {

      function format(elem) {
        if(elem.val()){
          elem.val(accounting.formatNumber(elem.val(), { thousand: " " }));
        }
      }

      function unformat(elem) {
        if(elem.val()){
          elem.val(accounting.unformat(elem.val()));
        }
      }

      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, model) {

          // Format value when model changed from other source than input
          scope.$watch(attrs["ngModel"], function() {
            model.$setViewValue(elem.val().replace(/\s/g,''));
            if (!document.activeElement || document.activeElement.id !== elem[0].id) {
              format(elem);
            }
          });

          elem.on("focus", function() {
            unformat(elem);
          }),

          elem.on("blur", function() {
            format(elem);
          });
        }

      };

    };

    return Directive;

  }

);