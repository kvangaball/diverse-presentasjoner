define(function() {

  var LeasingFormController = function($scope, calculationService, draftService) {

    var KEY = 'LEASING';

    // $scope.soknad   = calculationService.draft;
    $scope.data = calculationService.defaultSoknad;
    $scope.tempLeasingRente = $scope.data.rentee;
    $scope.LEASING  = calculationService.leasingRestriction;
    $scope.restPst = 50;

    var calculateLeasing = function() {
      return calculationService.calculateLeasing({
        carPrice :        $scope.data.pris * 1,
        paymentMonths :   $scope.data.lopetid_leasing * 1,
        residualValue :   $scope.restPst * 1,
        advancePay :      $scope.data.forskuddsleie * 1,
        nomInterestRate : $scope.data.rente * 1,
        registrationFee : $scope.data.regavgift * 1,
        startupFee :      0,
        statementFee :    $scope.LEASING.TERMIN_GEBYR,
        vat:              $scope.LEASING.VAT_RATE,
        minLoanAmount:    0,
        key:              KEY
      });
    };

    // Register calculation on parent
    var leasingProduct = {
        key: KEY,
        title: 'Leasing',
        price: 0
    };
    calculationService.registerProduct(leasingProduct);

    function calculateAndSave() {
      if ($scope.product && $scope.product.key == KEY) {
        leasingProduct.price = calculateLeasing();
        draftService.save($scope.data, KEY, function() {
          $scope.$apply();
        });
      }
    }

    $scope.$watch('data', calculateAndSave, true);
    $scope.$watch('product', calculateAndSave);

    $scope.$watch('restPst', function() {
      if (document.activeElement.id !== 'restverdi-input') {
        $scope.data.restverdi = Math.round($scope.calculateRestverdi());
      }
    });

    $scope.$watch('data.forskuddsleie', function() {
      if (document.activeElement.id !== 'pris-input') {
        $scope.forskuddsleiePst = $scope.calculateForskuddsleiePst();
      }
    });

    $scope.$watch('data.restverdi', function() {
      if (document.activeElement.id !== 'pris-input') {
        $scope.restPst = $scope.calculateRestverdiPst();
      }
    });

    // ————————————— PUBLIC  ————————————

    $scope.getMaxRestverdi = function() {
      return $scope.data.pris * $scope.LEASING.REST_MAX_PERC;
    };

    $scope.getMinRestverdi = function() {
      return $scope.data.pris * $scope.LEASING.REST_MIN_PERC;
    };

    $scope.isValidLeasingRente = function() {
      return $scope.data.rente >= $scope.LEASING.MIN_RENTE && $scope.data.rentee <= $scope.LEASING.MAX_RENTE;
    };

    $scope.isValidLeasingPris = function() {
      return $scope.data.pris <= $scope.LEASING.MAX_PRIS && $scope.data.pris >= $scope.LEASING.MIN_PRIS;
    };

    $scope.isValidLeasingMonths = function() {
      return $scope.data.lopetid_leasing >= $scope.LEASING.MIN_MND && $scope.data.lopetid_leasing <= $scope.LEASING.MAX_MND;
    };

    $scope.isValidRestverdi = function() {
      if ($scope.isValidLeasingPris()) {
        var restPst = $scope.calculateRestverdiPst();
        return restPst >= $scope.LEASING.REST_MIN_PERC * 100 && restPst <= $scope.LEASING.REST_MAX_PERC * 100;
      }
      return true;
    };

    $scope.isValidForskuddsleie = function() {
      if ($scope.isValidLeasingPris()) {
        return $scope.data.forskuddsleie * 1 <= (($scope.data.pris * 1 - $scope.data.regavgift * 1) / $scope.LEASING.VAT_RATE + $scope.data.regavgift * 1) - $scope.data.restverdi * 1 && $scope.data.forskuddsleie >= $scope.LEASING.MIN_FORSKUDDSLEIE;
      }
      return true;
    };

    $scope.isValidRegavgift = function () {
      if($scope.isValidLeasingPris()){
        return $scope.data.regavgift <= $scope.calculateMaxRegavgift() && $scope.data.regavgift >= $scope.LEASING.MIN_REGAVGIFT;
      }
      return true;
    };

    $scope.calculateRestverdi = function () {
      return $scope.restPst * $scope.data.pris / 100;
    };

    $scope.calculateRestverdiPst = function () {
      return $scope.data.restverdi / $scope.data.pris * 100;
    };

    $scope.calculateMaxForskuddsleie = function () {
      var max = Math.round((($scope.data.pris * 1 - $scope.data.regavgift * 1) / $scope.LEASING.VAT_RATE + $scope.data.regavgift * 1) - $scope.data.restverdi * 1);
      return max > 0 ? max : 0;
    };

    $scope.calculateForskuddsleiePst = function() {
      return $scope.data.forskuddsleie / $scope.data.pris * 100;
    };

    $scope.calculateMaxRegavgift = function () {
      return $scope.data.pris * 1;
    };

    $scope.calculateMinRestverdi = function() {
      return $scope.data.pris * $scope.LEASING.REST_MIN_PERC;
    };

    $scope.calculateMaxRestverdi = function() {
      return $scope.data.pris * $scope.LEASING.REST_MAX_PERC;
    };

  };

  LeasingFormController.$inject = ['$scope', 'calculationService', 'draftService'];

  return LeasingFormController;

});

