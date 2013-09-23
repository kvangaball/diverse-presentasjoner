define([
  'lib/jquery-ui/jquery-ui',
  'lib/jquery-ui-touch-punch/jquery.ui.touch-punch.min'], function() {

  var Directive = function(uiConfig) {

    uiConfig.uiSlider = uiConfig.uiSlider || {};

    return {
      restrict: 'C',
      name: 'slider',
      transclude: true,
      scope: {
        value: '=value'
      },

      link: function (scope, elm, $attrs, uiEvent) {
        var options = {
          // Attributes
          min: $attrs.min ? parseFloat($attrs.min) : 0,
          max: $attrs.max ? parseFloat($attrs.max) : 100,
          step: $attrs.step ? parseFloat($attrs.step) : 1,
          range: $attrs.range ? $attrs.range : false,
          value: $attrs.value ? $attrs.value : 0,

          // Events
          slide: function (event, ui) {
            scope.$apply(function () {
              scope.value = ui.value;
              if ($attrs.change) {
                scope.$parent.$eval($attrs.change);
              }
            });
          }
        };

        if (isNaN($attrs.min)) {
          scope.$parent.$watch($attrs.min, function() {
            elm.slider({
              min: parseFloat(scope.$parent[$attrs.min])
            });
          });
          options.min = 0;
        }
        if (isNaN($attrs.max)) {
          scope.$parent.$watch($attrs.max, function() {
            elm.slider({
              max: parseFloat(scope.$parent[$attrs.max])
            });
          });
          options.max = 100;
        }

        scope.$watch('value', function (value, evt) {
          if (value && value != elm.slider('value')) {
            elm.slider('value', value);
          }
        });

        elm.slider(options);
      }
    };

  };

  Directive.$inject = ['ui.config'];

  return Directive;

});