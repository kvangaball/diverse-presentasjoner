define(function() {

	var Service = function() {
		var prefix = "gjensidigePluss-";

		var USER = prefix + "user";
		var PRODUCT = prefix + "product";

		return {
			getUser: function () {
				return localStorage.getItem(USER);
			},

			setUser: function (user) {
				localStorage.setItem(USER, user);
			},

			removeUser: function () {
				localStorage.removeItem(USER);
			},

			setPreferredProduct: function (productKey) {
				localStorage.setItem(PRODUCT, productKey);
			},

			getPreferredProduct: function () {
				return localStorage.getItem(PRODUCT);
			}
		};
	};

	Service.$inject = [];

	return Service;


});
