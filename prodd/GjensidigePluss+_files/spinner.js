define([
  'lib/spin/spin.min'
  ],


  function(Spinner) {

    /*
    Supported TAG attributes:
    - top:      yPosition
    - left:     xPosition
    - options:  JSON which extends default spinner options 
    */


    var OPTIONS = {
      lines:      13, // The number of lines to draw
      length:     20, // The length of each line
      width:      10, // The line thickness
      radius:     30, // The radius of the inner circle
      corners:    1, // Corner roundness (0..1)
      rotate:     0, // The rotation offset
      direction:  1, // 1: clockwise, -1: counterclockwise
      color:      '#fff', // #rgb or #rrggbb
      speed:      1, // Rounds per second
      trail:      60, // Afterglow percentage
      shadow:     false, // Whether to render a shadow
      hwaccel:    false, // Whether to use hardware acceleration
      className:  'spinner', // The CSS class to assign to the spinner
      zIndex:     2e9, // The z-index (defaults to 2000000000)
      top:        'auto', // Top position relative to parent in px
      left:       'auto' // Left position relative to parent in px
    };

    var styles = {
      small: {
        length: 6,
        width:  2,
        radius: 5
      },
      medium: {
        length: 10,
        width:  3,
        radius: 10
      }
    };

    var Directive = function() {

      var spinner;

      function createSpinner(target, style, options) {
        var opts = _.extend(OPTIONS, {});
        if (style && styles[style]) {
          opts = _.extend(opts, styles[style]);
        }
        if (options) {
          opts = _.extend(opts, options);
        }
        return new Spinner(opts).spin(target);
      }


      function toggleSpinner(spin, elem, style, options) {
        if (spin) {
          spinner = createSpinner(elem, style, options);
        } else {
          if (spinner) {
            if(spinner && spinner.el && elem === spinner.el.parentElement) {
              spinner.stop();
            }
          }
        }
      }

      return {
        link: function($scope, elem, attrs) {
          var options = {};
          try {
            options = attrs.options ?  angular.fromJson(attrs.options) : {};
          } catch (e) {}

          if (attrs.top) {  options.top = attrs.top; }
          if (attrs.left) {  options.left = attrs.left; }
          if (attrs.color) {  options.color = attrs.color; }

          $scope.$watch(attrs.spinner, function(evt) {
            toggleSpinner($scope[attrs.spinner], elem.parent()[0], attrs.style, options);
          });
        }
      };

    };

    return Directive;

  }

);