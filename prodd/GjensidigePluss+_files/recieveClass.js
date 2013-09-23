define(function() {

  var RecieveClass = function() {

    function setPristineOnInput(elem, ctrl) {
      if (elem) {
        ctrl.$dirty = false;
        ctrl.$pristine = true;
        angular.element(elem).removeClass('ng-dirty').addClass('ng-pristine');
      }
    }

    function setDirtyOnInput(elem, ctrl) {
      if (elem) {
        ctrl.$pristine = false;
        ctrl.$dirty = true;
        angular.element(elem).removeClass('ng-pristine').addClass('ng-dirty');
      }
    }

    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        scope.$on('setClass', function (evt, data) {
          angular.element(elem).addClass(data);
        });
        scope.$on('removeClass', function (evt, data) {
          angular.element(elem).removeClass(data);
        });
        scope.$on('setPristineAll', function (evt, data) {
          setPristineOnInput(elem, ctrl);
        });
        scope.$on('setPristineMedlaner', function (evt, data) {
          if(attrs.recieveClass){
            setPristineOnInput(elem, ctrl);
          }
        });
        scope.$on('setDirtyAll', function (evt, data) {
          setDirtyOnInput(elem, ctrl);
        });
      }
    };
  };

  return RecieveClass;

});