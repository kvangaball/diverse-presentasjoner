define(function() {
  

  var NgBlur = function() {
    return function(scope, elem, attrs) {
      elem.bind('blur', function() {
        scope.$apply(attrs.ngBlur);
      });
    };
  };

  return NgBlur;

});