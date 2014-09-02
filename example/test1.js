/* global describe, it, selenium */
'use strict';

var assert = require("assert");
var driver = selenium_easy.driver;
var webdriver = selenium_easy.webdriver;
var expect = selenium_easy.expect;

describe('Array', function () {
	describe('#indexOf()', function(){
		it('should return -1 when the value is not present', function(done) {
			driver.get('http://www.google.com');
			driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
			driver.findElement(webdriver.By.name('btnG')).click();
			driver.wait(function() {
				return driver.getTitle().then(function(title) {
					return title === 'webdriver - Google Search';
				});
			}, 1000);
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
			done();
		});
	});
});