define([
  'common/services/textService'
  ],

  function() {

    var Filter = function(textService) {
      return function(key) {
        return textService.text(key);
      };
    };

    Filter.$inject = ['textService'];

    return Filter;

  }

);