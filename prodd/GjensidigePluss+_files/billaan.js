define(['lib/underscore/underscore'], function () {

	return function (options) {

		var _values = {
			carPrice: 0,
			equity: 0,
			paymentMonths: 0,
			nomInterestRate: 0,
			startupFee: 0,
			statementFee: 0,
			documentFee: 0,
			minLoanAmount: 0   // Ev. min lånebeløp
		};

		_.extend(_values, options);

		var _loanAmount 		= calcNeededLoan(),
			_nomInterestRate 	= _values.nomInterestRate,
			_calcMonthlyAmount 	= paymentAmount(_nomInterestRate),
			_ekprosent 			= _values.equity / _values.carPrice * 100,
			_effInterestRate 	= (_ekprosent < 100) ? effInterestRate(_nomInterestRate) : 0;

		_monthlyPayment = isNaN(_calcMonthlyAmount) ? 0 : _calcMonthlyAmount;

		return {
			loanAmount: 		_loanAmount,
			nomInterestRate: 	_nomInterestRate,
			monthlyPayment: 	_monthlyPayment,
			ekProsent: 			_ekprosent,
			effInterestRate: 	_effInterestRate
		};

		function paymentAmount(rate) {
			var loanAmount = calcNeededLoan();

			if (loanAmount === 0) {
				return 0;
			}

			var numberOfMonths = _values.paymentMonths > 0 ? _values.paymentMonths : 1;
			var presentValue = -loanAmount;
			var f = 0;
			var returnValue = 0;

			var rate = (parseFloat(rate, 10) / 100) / 12;
			rate = isNaN(rate) ? 0 : rate;

			if (rate === 0) {
				returnValue = -1 * (f + presentValue) / numberOfMonths;
			} else {
				var r1 = rate + 1;
				returnValue = (f + presentValue * Math.pow(r1, numberOfMonths)) * rate / (1 - Math.pow(r1, numberOfMonths));
			}

			return Math.ceil(returnValue + _values.statementFee);
		}

		function calcNeededLoan() {
			_values.carPrice = (_values.carPrice < 0) ? 0 : _values.carPrice;
			return _values.equity > 0 ? _values.carPrice - _values.equity + _values.startupFee + _values.documentFee : _values.carPrice + _values.startupFee + _values.documentFee;
		}

		function effInterestRate(rate) {
	      	var laan 			= calcNeededLoan() * 1 > 0 ? calcNeededLoan() * 1 : 0,
	      		omkostn 		= _values.startupFee + _values.documentFee,
	      		terminbetaling 	= paymentAmount(rate),
	      		sumterminer 	= _values.paymentMonths > 0 ? _values.paymentMonths : 1,
	      		restlaan 		= 0,
	      		sjekkrente 		= 0.00,
	      		tintrente 		= 0,
	      		tintrente2 		= 0;


			var naaverdi1 = laan * 1 - omkostn * 1 - restlaan * 1 - (terminbetaling * 1) * sumterminer;
			if (laan === 0) {
					return 0;
			} else if (Math.abs(naaverdi1) < 0.000001) {
					tintrente = 0;
			} else {
				if (naaverdi1 < 0) {
					var testrente2 = 0.001;
					var funnet = false;
					var naaverdi2 = naaverdi1 * 1;

					while (naaverdi2 < 0 && !funnet) {
						naaverdi2 = laan * 1 - omkostn * 1 - (restlaan / (Math.pow((1 + testrente2 * 1), sumterminer))) - (terminbetaling * 1) * ((Math.pow((1 + testrente2 * 1), sumterminer) - 1) / ((Math.pow((1 + testrente2 * 1), sumterminer)) * testrente2));
						if (naaverdi2 >= 0) {
						  funnet = true;
						  sjekkrente = testrente2 * 1;
						} else {
						  testrente2 = testrente2 * 1 + 0.001 * 1;
						}
					}
				} else if (naaverdi1 >= 0) {
					var naaverdi2 = naaverdi1 * 1;
					var testrente3 = -0.001 * 1;
					var funnet = false;
					while (naaverdi2 > 0 && !funnet) {
						naaverdi2 = laan * 1 - omkostn * 1 - (restlaan / (Math.pow((1 + testrente3 * 1), sumterminer))) - (terminbetaling * 1) * ((Math.pow((1 + testrente3 * 1), sumterminer) - 1) / ((Math.pow((1 + testrente3 * 1), sumterminer)) * testrente3));
						if (naaverdi2 <= 0) {
						  	funnet = true;
						  	sjekkrente = testrente3 * 1;
						} else {
						  	testrente3 = testrente3 * 1 - 0.001 * 1;
						}
					}
				}
				if (naaverdi1 < 0) {
					tintrente2 = sjekkrente * 1 - 0.001 * 1;
				} else {
					tintrente2 = sjekkrente * 1 + 0.001 * 1;
				}

				var tintrente3 = sjekkrente * 1;

				var delverdi1 = (restlaan / (Math.pow((1 + tintrente2 * 1), sumterminer))),
					delverdi2 = (Math.pow((1 + tintrente2 * 1), sumterminer) - 1),
					delverdi3 = ((Math.pow((1 + tintrente2 * 1), sumterminer)) * tintrente2 * 1),
					delverdi4 = isNaN(delverdi2 / delverdi3) ? 0 : delverdi2 / delverdi3;

				var naaverdi3 = laan * 1 - omkostn * 1 - delverdi1 - (terminbetaling * 1) * delverdi4;
				naaverdi3 = Math.abs(naaverdi3);

				var naaverdi4 = laan * 1 - omkostn * 1 - (restlaan / (Math.pow((1 + tintrente3 * 1), sumterminer))) - (terminbetaling * 1) * ((Math.pow((1 + tintrente3 * 1), sumterminer) - 1) / ((Math.pow((1 + tintrente3 * 1), sumterminer)) * tintrente3 * 1));
				naaverdi4 = Math.abs(naaverdi4);

				tintrente = tintrente2 + (tintrente3 - tintrente2) * (naaverdi3 / (naaverdi3 * 1 + naaverdi4 * 1));
			}

			var intrente = Math.pow((1 + tintrente), 12) - 1;
			intrente = Math.round(intrente * 10000) / 100;

			return intrente < 100 ? intrente * 1 : undefined;
		}

	};

});