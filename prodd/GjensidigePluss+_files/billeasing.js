define(['lib/underscore/underscore'], function () {


	return function (options) {

		var _values = {
			carPrice: 0,			// Bilpris
			paymentMonths: 0,		// Terminer
			residualValue: 0,		// Restverdi i %
			advancePay: 0,			// Forskuddsleie i kr
			nomInterestRate: 0,		// Rente i %
			registrationFee: 0,		// Regavgift/Engangsavgift
			startupFee: 0,			// Etableringsgebyr
			statementFee: 0,		// Termingebyr
			vat: 0,					// MVA rate
			minLoanAmount: 0		// Ev. min lånebeløp
		};

		_.extend(_values, options);
		var _advancePayValue = _values.advancePay;
		var _calcBasis = monthlyPaymentBasis(_advancePayValue);
		var _nomInterestRate = _values.nomInterestRate;
		var _monthlyNetPayment = paymentAmountNet(_calcBasis, _nomInterestRate);
		var _monthlyGrossPayment = isNaN(_monthlyNetPayment) ? 0 : Math.ceil((_monthlyNetPayment + _values.statementFee) * _values.vat, 10);

		return {
			calcBasis: _calcBasis,
			nomInterestRate: _nomInterestRate,
			monthlyPayment: _monthlyGrossPayment,
			advancePayValue: _advancePayValue
		};

		function monthlyPaymentBasis(advance) {
			_values.carPrice = (_values.carPrice < 0) ? 0 : _values.carPrice;
			return _values.startupFee > _values.carPrice ? 0 : ((_values.carPrice - _values.registrationFee) / 1.25 + _values.registrationFee) - advance;
		}

		function paymentAmountNet(amount, rate) {
			var rate12 = (parseFloat(rate, 10) / 100) / 12;
			var r1 = rate12 + 1;
			var residual = parseFloat(_values.residualValue, 10) / 100 * _values.carPrice;
			var numberOfMonths = _values.paymentMonths > 0 ? _values.paymentMonths : 1;

			return ((amount - (residual / Math.pow(r1, numberOfMonths))) / ((1 - (1 / Math.pow(r1, numberOfMonths - 1))) / rate12 + 1));
		}

	};

});