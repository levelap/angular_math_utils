# math_utils #

Angular service to properly do math without floating point errors.

# Example #

    angular.module('myModule', []).controller('myController', function(math_utils){
      var result = math_utils.add(1, 2, 3);
      console.log(result, 'should be 6');
    })
