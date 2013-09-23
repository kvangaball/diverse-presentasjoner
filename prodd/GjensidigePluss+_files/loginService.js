define(['app/pages'], function(PAGES) {

	var LoginService = function($location, $q, storageService) {
		var indentifiedUser = storageService.getUser();

		return {
			userIndentified: indentifiedUser !== null,
			username: indentifiedUser ? indentifiedUser : '',

			login: function (token) {
				this.username = token;

				storageService.setUser(token);
				this.userIndentified = true;
				$location.path(PAGES.FORM.path);
				return true;
			},

			logout: function () {
				this.userIndentified = false,
					this.username = '',
					storageService.removeUser();
				$location.path(PAGES.LOGIN.path);
			}
		};

	};

	LoginService.$inject = ['$location', '$q', 'storageService'];

	return LoginService;

});
