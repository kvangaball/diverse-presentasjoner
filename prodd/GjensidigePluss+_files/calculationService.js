define([
	'common/calculation/billaan',
	'common/calculation/billeasing'
],


	function (billaanCalculator, billeasingCalculator) {

		var CalculationService = function($rootScope) {

			return {
				products: [],

				unavailableProduct: 'LEASING', // LAN, LEASING // Alle tilgjengelig? : Oppføring slettes eller settes til en annen verdi (ev. tom string)

				defaultSoknad: {
					pris:					300000,
          rente:            5.95,
					egenkapital:			105000,
					nedbetalingstid_lan:	60,
					lopetid_leasing:		36,
					restverdi:				150000,
					forskuddsleie:			60000,
					regavgift:				0
				},

				loanRestriction: {
					MAX_PRIS:					10000000,
					MIN_PRIS:					10000,
					MIN_EGENKAPITAL_PST:		35,
					MAX_PRISDIFF_EGENKAPITAL:	10000,
					MIN_MND:					12,
					MAX_MND:					120,
					MAX_RENTE :                 7.0,
					MIN_RENTE :                 4.6,
					TERMIN_GEBYR :				85,
					ADM_GEBYR :					2527,
					DOC_GEBYR :					1473
				},

				leasingRestriction: {
					MAX_PRIS:			10000000,
					MIN_PRIS:			90000,
					MIN_MND:            12,
					MAX_MND:            60,
					REST_MIN_PERC:      0,
					REST_MAX_PERC:      0.6,
					MIN_FORSKUDDSLEIE:	0,
					MIN_REGAVGIFT:		0,
					MAX_RENTE:			7.0,
					MIN_RENTE:			4.6,
					TERMIN_GEBYR:		85,
					VAT_RATE:			1.25
				},

				calculateLoan: function (options) {
					return billaanCalculator(options).monthlyPayment;
				},

				calculateLeasing: function (options) {
					return billeasingCalculator(options).monthlyPayment;
				},

				registerProduct: function (product) {
					var p = this.getProduct(product.key);
					if (!p && product.key !== this.unavailableProduct) {
						this.products.push(product);
					}
				},

				getProduct : function(key) {
					if(key !== this.unavailableProduct){
						return _.find(this.products, function(item) {
							return item && item.key === key;
						});
					}
				}

			};
		};

		CalculationService.$inject = ['$rootScope'];

		return CalculationService;

	}
);
