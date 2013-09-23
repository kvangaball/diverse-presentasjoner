define(function() {

  var INTEGER_REGEXP        = /^\-?\d*$/;
  var BASE_MOD_11_WEIGHTS   = [3,2,7,6,5,4,3,2];
  var ORGNO_LENGTH          = 9;

  var OrgNumberValidator = {

    validate : function(orgNumber) {

      function checkInteger(value){
        return INTEGER_REGEXP.test(value);
      }

      function validLength(value) {
        return value.length == 9;
      }

      function validChecksum(value){
        var sum = 0;

        for (var i=0; i < value.length - 1; i++) {
          var digit = parseInt(value.charAt(i),10);
          var product = digit * BASE_MOD_11_WEIGHTS[i];
          sum += product;
        }
        var div = sum % 11;
        var checksum = 11 - div;

        if (checksum === 10) {
          return false;
        }

        return checksum === parseInt(value.charAt(ORGNO_LENGTH-1), 10);
     }

      if(!orgNumber || !checkInteger(orgNumber) || !validLength(orgNumber) || !validChecksum(orgNumber)) {
        return false;
      }
      return true;
    }

  };


  return OrgNumberValidator;

});