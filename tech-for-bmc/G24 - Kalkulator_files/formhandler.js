var FormHandler = function () {

	this.$section = $('section.page-one');
	this.$sectionCalc = $('section.page-two');

	this.$tab = $('section.page-one .monthly > div');


	this.$sectionLoan = $('section.loan');
	this.$sectionInsurance = $('section.insurance');
	this.$sectionLeasing = $('section.leasing');

	this.$financeSelect = $('.select.finance-selector');

	this.$submit = $('#calcForm .submit button.primary');

	this.initialize();
};

FormHandler.prototype.initialize = function () {
	var self = this;

	self.$tab.on('click', function () {
		if(!$(this).hasClass('active')){
			$(this).addClass('active').siblings().removeClass('active');
			self.$section.toggleClass('loan');
			self.$financeSelect.toggle();

			self.$sectionCalc.not('.inactive').toggleClass('visible');
		}
	});

	self.$financeSelect.find('select').on('change', function() {
		self.$sectionCalc.not('.insurance').toggleClass('inactive visible');
	});

	self.$submit.on('click', function (e) {
		e.preventDefault();
	})
}