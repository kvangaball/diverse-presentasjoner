define(function() {

	var LoginCtrl = function($scope, loginService) {

		$scope.username = loginService.username;
		$scope.loginError = null;

		$scope.login = function() {
			if (validUsername()) {
				loginService.login($scope.username, $scope.password, $scope);
			}
		};

		function validUsername() {
			if ($scope.username && $scope.username.length === 8 || $scope.username.toLowerCase() === "g24") {
				return true;
			}

			$scope.loginError = {
				text: 'Ugyldig token - Prøv "G24" for test'
			};
			$scope.inputClass = "error";
			return false;
		}
	};

	return LoginCtrl;

});