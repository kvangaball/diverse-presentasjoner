define([
  'common/commonModule',
  'text!properties/texts.json'],

function(common, texts) {

  var TEXTS = angular.fromJson(texts);

  var Service = function() {
    return {
      text: function(key, alternativeKey) {
        if (TEXTS[key]) {
          return TEXTS[key];
        }
        if (TEXTS[alternativeKey]) {
          return TEXTS[alternativeKey];
        }
        return key;
      }
    };

  };

  return Service;

});