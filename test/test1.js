/* global describe, it, selenium */
'use strict';

var assert = require("assert");
var driver = selenium.driver;
var webdriver = selenium.webdriver;
var expect = selenium.expect;

console.log(driver);

console.log(webdriver);

console.log(expect);

describe('Array', function () {
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function() {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});