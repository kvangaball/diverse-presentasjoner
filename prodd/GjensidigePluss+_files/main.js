requirejs.config({
	urlArgs: "ts=" + Date.now(),
	baseUrl: g24config.urls.resourceUrl,
  paths: {
    Angular:            "lib/angular/angular.min",
    AngularResource:    "lib/angular/angular-resource",
    AngularUI:          "lib/angular-ui/angular-ui",
    AngularLocale_NO:   "lib/angular/angular-locale_no",
    Moment:             "lib/moment/moment",
    Moment_NO:          "lib/moment/lang/nb",
    jQueryUI:           "lib/jquery-ui/jquery-ui",

    lib :             "lib",
    common :          "source/common/scripts",
    properties :      "properties",
    assets :          "assets",
    text :            "lib/requirejs/text",
    app :             "source/mobile/scripts"
  },
	shim: {
    'Moment' :  {                           exports: 'moment' },
    'Moment_NO' :  {                        deps: ['Moment'] },
    'lib/jquery-ui/jquery-ui' : { },
    'lib/jquery-ui/js/ui.datepicker-no' : { deps: ['lib/jquery-ui/jquery-ui'] },
    'lib/jquery-ui-touch-punch/jquery.ui.touch-punch.min': { deps: ['lib/jquery-ui/jquery-ui'] },
    'lib/underscore/underscore' : {         exports: '_' },

    'AngularResource' : {                   deps: ['lib/angular/angular'] },
    'AngularUI' :  {                        deps: ['lib/angular/angular'] },
    'AngularLocale_NO' :  {                 deps: ['lib/angular/angular'] }
	}
});


require(
	[
    'lib/accounting/accounting',
    'lib/angular/angular',
    'AngularResource',
    'AngularUI',
    'AngularLocale_NO',
    'common/services/urlHelper',
    'app/mobileApp'
	],

	function (accounting) {
    accounting.settings = {
      currency: {
          symbol : "kr.",   // default currency symbol is '$'
          format: "%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
          decimal : ",",  // decimal point separator
          thousand: " ",  // thousands separator
          precision : 0   // decimal places
      },

      number: {
          precision : 0,  // default precision on numbers is 0
          thousand: " ",
          decimal : ","
      }
    };

    angular.bootstrap(document, ['mobileApp']);

	}
);
