#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var Mocha = require('mocha');
var expect = require('expect.js');
var seleniumProvider = require('../lib/selenium_provider');

function run (testPath, browser, reporter, ui) {
	var mocha = new Mocha({
		ui: ui,
		reporter: reporter
	});

	var selenium_easy = {
		driver: null,
		webdriver: null,
		expect: expect
	};

	seleniumProvider.start(browser, function (driver, webdriver) {
		selenium_easy.driver = driver;
		selenium_easy.webdriver = webdriver;
		GLOBAL.selenium_easy = selenium_easy;
	});


	if (testPath.substr(-3) === '.js') {
		mocha.addFile(testPath);
	} else {
		fs.readdirSync(testPath).filter(function(file){
			// Only keep the .js files
			return file.substr(-3) === '.js';

		}).forEach(function(file){
			// Use the method "addFile" to add the file to mocha
			mocha.addFile(
				path.join(testPath, file)
			);
		});
	}


	mocha.run(function(failures){
		process.on('exit', function () {
			selenium_easy.driver.quit();
			process.exit(failures);
		});
	});
}
exports.run = module.exports.run = run;

