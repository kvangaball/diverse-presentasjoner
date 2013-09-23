var LoginHandler = function () {
	
	this.$sectionLogin = $('section.page-login');
	this.$sectionCalc = $('section.calculator');

	this.$login = $('#bruker-input');
	this.$formTools = $('.submit, .control-group.finance-selector');

	this.$submit = $('section.page-login button.primary');

	this.initialize();
};

LoginHandler.prototype.initialize = function () {
	var self = this;

	self.$submit.on('click', function (e) {
		var bruker = self.$login.val();
		
		e.preventDefault();
		$("body").removeClass('login');
		self.$sectionLogin.hide();
		self.$formTools.show();
		self.$sectionCalc.not('.leasing').addClass('visible');

		if(bruker)
			$('section.page-three #' + bruker).show();

		self.on_load();
	});
}

LoginHandler.prototype.on_load = function () {
	setTimeout(function () {
		$('body').scrollTop(1);
	}, 100);
}