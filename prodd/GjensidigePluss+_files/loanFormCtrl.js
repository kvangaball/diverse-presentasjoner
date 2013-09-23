define(function() {

  var LoanFormController = function($scope, calculationService, draftService) {

    var KEY = 'LAN';

    $scope.data = calculationService.defaultSoknad;
    $scope.tempLaanRente = $scope.data.rente;
    $scope.price = 1;
    $scope.LOAN = calculationService.loanRestriction;

    var calculateLoan = function() {
      return calculationService.calculateLoan({
        carPrice :        $scope.data.pris,
        equity :          $scope.data.egenkapital,
        paymentMonths :   $scope.data.nedbetalingstid_lan,
        nomInterestRate:  $scope.data.rente,
        startupFee :      $scope.LOAN.ADM_GEBYR,
        statementFee :    $scope.LOAN.TERMIN_GEBYR,
        documentFee :     $scope.LOAN.DOC_GEBYR,
        minLoanAmount:    0,
        key:              KEY
      });
    };

    // Register product on parent
    var loanProduct = {
        key: KEY,
        title: 'Lån',
        price: 0
    };
    calculationService.registerProduct(loanProduct);

    function calculateAndSave() {
      if ($scope.product && $scope.product.key == KEY) {
        loanProduct.price = calculateLoan();

        draftService.save($scope.data, KEY, function() {
          $scope.$apply();
        });
      }
    }

    $scope.$watch('product', calculateAndSave);
    $scope.$watch('data', calculateAndSave, true);

    // ————————————— PUBLIC  ————————————

    $scope.isNotTooMuchEgenkapital = function() {
      return $scope.data.egenkapital <= $scope.getMaxEgenkapital();
    };

    $scope.isEnoughEgenkapital = function() {
      return $scope.calculateEgenkapitalPst() >= $scope.LOAN.MIN_EGENKAPITAL_PST;
    };

    $scope.isValidPris = function() {
      return $scope.data.pris <= $scope.LOAN.MAX_PRIS && $scope.data.pris >= $scope.LOAN.MIN_PRIS;
    };

    $scope.isValidRente = function() {
      return $scope.data.rente >= $scope.LOAN.MIN_RENTE && $scope.data.rente <= $scope.LOAN.MAX_RENTE;
    };

    $scope.isValidNedbetalingstid = function() {
      return $scope.data.nedbetalingstid_lan >= $scope.LOAN.MIN_MND && $scope.data.nedbetalingstid_lan <= $scope.LOAN.MAX_MND;
    };

    $scope.getMaxEgenkapital = function() {
      return $scope.data.pris - $scope.LOAN.MAX_PRISDIFF_EGENKAPITAL;
    };

    $scope.getMinEgenkapital = function() {
      return $scope.data.pris * $scope.LOAN.MIN_EGENKAPITAL_PST / 100;
    };

    $scope.getMaxPris = function() {
      return $scope.LOAN.MAX_PRIS;
    };


    $scope.calculateEgenkapitalPst = function () {
      var ek = $scope.data.egenkapital / $scope.data.pris * 100;
      return isNaN(ek) ? 100 : ek;
    };

  };

  LoanFormController.$inject = ['$scope', 'calculationService', 'draftService'];

  return LoanFormController;

});

