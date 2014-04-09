'use strict';

describe('Math Utils Factory', function(){

  beforeEach(module('MathUtils'));

  var math_utils;

  beforeEach(inject(function($injector){
    math_utils = $injector.get('math_utils');
  }));

  describe('add', function() {
    it('should add correctly values accounting for floating point errors', function() {
      expect(math_utils.add(0.1, 0.2)).toBe(0.3);
      expect(math_utils.add(7.8, 7.6)).toBe(15.4);
      expect(math_utils.add(7.8, 7.6, 1.2)).toBe(16.6);
      expect(math_utils.add(7.8001, 0.0001)).toBe(7.8002);
    });

    describe('when receive a null parameter', function(){
      it('should return null', function(){
        expect(math_utils.add(7.8, 7.6, null)).toBe(null);
        expect(math_utils.add(null, 7.6, null)).toBe(null);
      });
    });

    describe('when receive empty arguments', function(){
      it('should return null', function(){
        expect(math_utils.add()).toBe(null);
      });
    });
  });

  describe('subtract', function() {
    it('should subtract correctly values accounting for floating point errors', function() {
      expect(math_utils.subtract(0.3, 0.2)).toBe(0.1);
      expect(math_utils.subtract(3, 1)).toBe(2);
      expect(math_utils.subtract(3.0001,0.0002)).toBe(2.9999);
    });

    describe('when receive a null parameter', function(){
      it('should return null', function(){
        expect(math_utils.subtract(7.8, 7.6, null)).toBe(null);
        expect(math_utils.subtract(null, 7.6, null)).toBe(null);
      });
    });

    describe('when receive empty arguments', function(){
      it('should return null', function(){
        expect(math_utils.subtract()).toBe(null);
      });
    });
  });

  describe('multiply', function() {
    it('should multiply correctly values accounting for floating point errors', function() {
      expect(math_utils.multiply(0.2, 0.1)).toBe(0.02);
      expect(math_utils.multiply(9.12, 100)).toBe(912);
    });

    describe('when receive a null parameter', function(){
      it('should return null', function(){
        expect(math_utils.multiply(7.8, 7.6, null)).toBe(null);
        expect(math_utils.multiply(null, 7.6, null)).toBe(null);
      });
    });

    describe('when receive empty arguments', function(){
      it('should return null', function(){
        expect(math_utils.multiply()).toBe(null);
      });
    });
  });

  describe('divide', function() {
    it('should divide correctly values accounting for floating point errors', function() {
      expect(math_utils.divide(0.3, 0.1)).toBe(3);
      expect(math_utils.divide(4, 10)).toBe(0.4);
      expect(math_utils.divide(20,2,4)).toBe(2.5);
    });

    describe('when receive a null parameter', function(){
      it('should return null', function(){
        expect(math_utils.divide(7.8, 7.6, null)).toBe(null);
        expect(math_utils.divide(null, 7.6, null)).toBe(null);
      });
    });

    describe('when receive empty arguments', function(){
      it('should return null', function(){
        expect(math_utils.divide()).toBe(null);
      });
    });
  });

  describe('average', function() {
    it('should return the average for an array of numbers', function() {
      var collection = [7.8, 7.6];
      expect(math_utils.average(collection)).toBe(7.7);

      collection = [10, 8, '6', '0'];
      expect(math_utils.average(collection)).toBe(6);

      collection = [10, 8, '6', null];
      expect(math_utils.average(collection)).toBe(null);
    });

    describe('the array is empty', function(){
      it('should return "null"', function(){
        var collection = [];
        expect(math_utils.average(collection)).toBe(null);
      });
    });

    describe('the array contains only null values', function(){
      it('should return "null"', function(){
        var collection = [null, null];
        expect(math_utils.average(collection)).toBe(null);
      });
    });

    describe('If a value is "null"', function() {
      it('should omit such values and return the average', function(){
        var collection = [10, 8, 6, null, 4, 0];
        expect(math_utils.average(collection)).toBe(null);
      });
    });

    describe('wighted_average', function() {
      it('should return an average of an array of objects with value, weight properties', function() {
        var collection = [{weight: 25, value:10}, {weight: '25', value:8}, {weight: '25', value:'6'}, {weight: '25', value:'4'}];
        expect(math_utils.weighted_average(collection)).toBe(7);
      });

      describe('When weights dont add 100', function() {
        it('should return the average weighted accordingly', function() {
          var collection = [{weight: 25, value:10}, {weight: '25', value:8}, {weight: '25', value:'6'}];
          expect(math_utils.weighted_average(collection)).toBe(8);
        });
      });

      describe('When receive an empty array', function() {
        it('should return null', function() {
          var collection = [];
          expect(math_utils.weighted_average(collection)).toBe(null);
        });
      });

      describe('when receive null in values_properties', function(){
        it('should return null', function(){
          var collection = [{weight: '20', value:'10'}, {weight: '20', value:null}];
          expect(math_utils.weighted_average(collection)).toBe(null);

          collection = [{weight: '20', value:null}, {weight: '20', value:null}];
          expect(math_utils.weighted_average(collection)).toBe(null);
        });
      });
    });
    
    describe('truncated_average', function() {
      it('should return the truncated average of collection', function() {
        var collection = [7.65, 7.66];
        expect(math_utils.truncated_average(collection)).toBe(7.65);
      });
    });
    
    describe('truncated_weighted_average', function() {
      it('should return the truncated average of weighted collection', function() {
        var collection = [{weight: '20', value:'7.65'}, {weight: '20', value:7.66}];
        expect(math_utils.truncated_weighted_average(collection)).toBe(7.65);
      });
    });
  });

  describe('Truncate', function() {
    it('should truncate decimal values to the default decimal places', function() {
      expect(math_utils.truncate(8.128)).toBe(8.12);
      expect(math_utils.truncate(9.12)).toBe(9.12);
      expect(math_utils.truncate(9.1)).toBe(9.1);
      expect(math_utils.truncate(9.0)).toBe(9);
    });
    it('should return null if passed number is null, undefined, "", but not 0', function() {
      expect(math_utils.truncate(null)).toBe(null);
      expect(math_utils.truncate(undefined)).toBe(null);
      expect(math_utils.truncate(false)).toBe(null);
      expect(math_utils.truncate('')).toBe(null);
      expect(math_utils.truncate(0)).toBe(0);
    });
  });
});
