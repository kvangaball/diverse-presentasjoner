define(function() {

  var CalculatorCtrl = function($scope, $http, calculationService, storageService, draftService, navigationService) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

    $scope.products = calculationService.products;
    $scope.$watch('product', savePreferredProduct);

    var defaultSoknad;

    draftService.init()
      .then(draftService.getDraft)
      .then(draftLoaded);

    $scope.lastSave = draftService.lastSave;

    $scope.$watch('products', function() {
      $scope.product  = getPreferredProduct();
    });

    $scope.showLoanForm = function() {
      var product = _.find($scope.products, function (prod) {
        return prod && prod.key === 'LAN';
      });
      return $scope.product == product;
    };

    $scope.showLeasingForm = function() {
      var product = _.find($scope.products, function (prod) {
        return prod && prod.key === 'LEASING';
      });
      return $scope.product == product;
    };

    $scope.calculateInsurance = function(data) {
      return '0';
    };

    $scope.gotoSoknad = function() {
      navigationService.gotoApplication();
    };

    $scope.resetCalc = function() {
      _.extend(calculationService.defaultSoknad, defaultSoknad);
      $scope.product = $scope.products[0];
    };

    $scope.productsDisabled = function () {
      return $scope.products.length === 1;
    };

    // ————————————— RESULT HANDLERS ————————————

    function draftLoaded(draft) {
      defaultSoknad = angular.copy(calculationService.defaultSoknad);
      if (draft && draft.soknadstype) {
        _.extend(calculationService.defaultSoknad, draft);
        $scope.product = getProductByKey(draft.soknadstype);
      }
    }

   function savePreferredProduct() {
      if ($scope.product) {
        storageService.setPreferredProduct($scope.product.key);
      }
    }

    function getPreferredProduct() {
      var prefProd = storageService.getPreferredProduct();
      var prod = getProductByKey(prefProd);
      return prod ? prod : $scope.products[0];
    }

    function getProductByKey(key) {
      return _.find($scope.products, function(prod) {
        return prod && prod.key == key;
      });
    }
  };

  return CalculatorCtrl;

});