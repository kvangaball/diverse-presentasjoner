define(function() {
  

  var OnEnter = function() {
    return function(scope, element, attrs) {
      element.bind("keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(
            function(){
              if(!scope.$eval(attrs.antiConditionForOnEnter)){
                scope.$eval(attrs.onEnter);
              }
            }
          );
          event.preventDefault();
        }
      });
    };
  };

  return OnEnter;

});