define([
  'common/services/cookieService',
  'common/services/textService',
  'common/services/resourceService',
  'common/directives/decimalInput',
  'common/directives/numberInput',
  'common/directives/fodselsnummer',
  'common/directives/orgnummer',
  'common/directives/telefonnummer',
  'common/directives/epost',
  'common/directives/customerid',
  'common/directives/spinner',
  'common/directives/restrict',
  'common/directives/onEnter',
  'common/directives/recieveClass',
  'common/directives/ngBlur',
  'common/filters/textFilter'
  ],

  function(
    cookieService,
    textService,
    resourceService,
    decimalInput,
    numberInput,
    fodselsnummer,
    orgnummer,
    telefonnummer,
    epost,
    customerid,
    spinner,
    restrict,
    onEnter,
    recieveClass,
    ngBlur,
    textFilter
    ) {

    var commonModule = angular.module('common', {}, function() {});

    // Add services
    commonModule.factory('cookieService', cookieService);
    commonModule.factory('textService', textService);
    commonModule.factory('resourceService', resourceService);

    // Add directives
    commonModule.directive('decimalInput', decimalInput);
    commonModule.directive('numberInput', numberInput);
    commonModule.directive('fodselsnummer', fodselsnummer);
    commonModule.directive('orgnummer', orgnummer);
    commonModule.directive('telefonnummer', telefonnummer);
    commonModule.directive('epost', epost);
    commonModule.directive('customerid', customerid);
    commonModule.directive('spinner', spinner);
    commonModule.directive('restrict', restrict);
    commonModule.directive('onEnter', onEnter);
    commonModule.directive('recieveClass', recieveClass);
    commonModule.directive('ngBlur', ngBlur);

    // Add filters
    commonModule.filter('text', textFilter);

    return commonModule;

  }

);