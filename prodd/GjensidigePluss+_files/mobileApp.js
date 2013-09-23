define([
  'app/controllers/loginCtrl',
  'app/controllers/navCtrl',
  'app/services/loginService',
  'app/services/appStateService',
  'common/services/draftService',
  'common/modules/financeCalculator/financeCalculatorModule',
  'app/pages',
  'common/commonModule',
  'Moment',
  'Moment_NO'
	],

	function(
		LoginCtrl,
		navCtrl,
		loginService,
		appStateService,
		draftService,
		financeCalculator,
		PAGES) {

		var MobileMainApp = angular.module('mobileApp', [
			'ng',
			'ngResource',
			'ui',
			'common',
			'financeCalculator'],

			function ($routeProvider, $httpProvider) {
				$routeProvider.when(PAGES.LOGIN.path, { templateUrl: '/login.html', controller: LoginCtrl });
				$routeProvider.when(PAGES.FORM.path, { templateUrl: '/form.html', controller: 'CalculatorCtrl' });
				$routeProvider.otherwise({ redirectTo: '/login' });
			}
		)

		.run(function ($rootScope, $location, loginService, appStateService, draftService, urlHelper) {
			$rootScope.page = PAGES.LOGIN;
			$rootScope.pageState = appStateService.pageState;
			draftService.mobile(true);

			// Register controllers
			$rootScope.navCtrl = navCtrl;

			$rootScope.$on('$routeChangeStart', function (event, next, current) {
				var token = urlHelper.getParameter('token');

				if(token) {
					loginService.login(token);
				} else if (loginService.userIndentified) {
					$location.path(PAGES.FORM.path);
				} else {
					$location.path(PAGES.LOGIN.path);
				}

			});

			$rootScope.$on('$routeChangeSuccess', function (event, next, current) {
				switch ($location.path()) {
					case PAGES.FORM.path:
						$rootScope.page = PAGES.FORM;
						break;
					case PAGES.LOGIN.path:
						$rootScope.page = PAGES.LOGIN;
						break;
				}
			});
		});

		MobileMainApp.factory('loginService', loginService);
		MobileMainApp.factory('appStateService', appStateService);

		return MobileMainApp;

	}

);

