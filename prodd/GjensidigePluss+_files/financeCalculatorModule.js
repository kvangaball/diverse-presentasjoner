define([
  'common/modules/financeCalculator/calculatorCtrl',
  'common/modules/financeCalculator/loanFormCtrl',
  'common/modules/financeCalculator/leasingFormCtrl',
  'common/modules/financeCalculator/draftSaveStatusCtrl',
  'common/modules/financeCalculator/calculationService',
  'common/services/applicationService',
  'common/services/productsService',
  'common/services/storageService',
  'common/services/navigationService',
  'common/services/draftService',
  'common/directives/uiSlider',
  'Moment',
  'Moment_NO'
  ],

  function(
    calculatorCtrl,
    loanFormCtrl,
    leasingFormCtrl,
    draftSaveStatusCtrl,
    calculationService,
    applicationService,
    productsService,
    storageService,
    navigationService,
    draftService,
    uiSlider)
  {

    var FinanceCalculatorModule = angular.module("financeCalculator", [], function() {})
    .run(['$rootScope', function($rootScope) {
      $rootScope.CalculatorCtrl  = calculatorCtrl;
      $rootScope.LoanFormCtrl  = loanFormCtrl;
      $rootScope.LeasingFormCtrl  = leasingFormCtrl;
      $rootScope.DraftSaveStatusCtrl  = draftSaveStatusCtrl;
    }]);

    FinanceCalculatorModule.factory('calculationService', calculationService);
    FinanceCalculatorModule.factory('productsService', productsService);
    FinanceCalculatorModule.factory('applicationService', applicationService);
    FinanceCalculatorModule.factory('storageService', storageService);
    FinanceCalculatorModule.factory('draftService', draftService);
    FinanceCalculatorModule.factory('navigationService', navigationService);
    FinanceCalculatorModule.directive('uiSlider', uiSlider);

    return FinanceCalculatorModule;

  }

);