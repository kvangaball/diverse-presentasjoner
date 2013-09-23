define(function() {

  var NavCtrl = function($scope, loginService, appStateService) {
    $scope.loginService  = loginService;
    $scope.user         = loginService;

    $scope.logout = function() {
      hideMenu();
      loginService.logout();
    };

    $scope.toggleMenu = function() {
      $scope.menuActive = !$scope.menuActive;
      $scope.menuClass = $scope.menuActive ? 'active' : '';
      updateAppStateService();
    };

    function hideMenu() {
      $scope.menuActive = false;
      $scope.menuClass = '';
      updateAppStateService();
    }

    function updateAppStateService() {
      appStateService.disablePage($scope.menuActive);
    }

    $scope.goHome = function() {};

  };

  return NavCtrl;

});
