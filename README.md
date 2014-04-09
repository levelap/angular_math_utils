[![Build Status](https://travis-ci.org/levelap/angular_math_utils.svg?branch=master)](https://travis-ci.org/levelap/angular_math_utils)

# math_utils for angular #

Angular service to properly do math without floating point errors.
## Dependencies

- [Big.js](https://github.com/MikeMcl/big.js/)
- [underscore.js](http://underscorejs.org/)

## Example

include module as a dependency of your app.

```javascript
angular.module('myModule', ['MathUtils'])
.controller('myController', function(math_utils){
  var result = math_utils.add(1, 2, 3);
  console.log(result, 'should be 6');
})
```

# Running tests #

### Install Global dependencies


- [Nodejs](http://nodejs.org/)
- [Bower](http://bower.io/)
- [Phantomjs](http://phantomjs.org/)

### Install Project dependencies

    npm install
    bower install
    
### Run tests
    grunt
