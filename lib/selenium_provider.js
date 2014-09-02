'use strict';

var fs = require('fs');
var path = require('path');
var webdriver = require('selenium-webdriver');
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

var seleniumPath = path.resolve(__dirname, '../external_bin/selenium');
var seleniumJarPath = path.resolve(seleniumPath, 'selenium-server-standalone-2.42.2.jar');
var ieDriverPath = path.resolve(seleniumPath, 'IEDriverServer.exe');
var pathSep = /^win/.test(process.platform) ? ';' : ':';

var driver = null;


function dump () {
	console.log(seleniumJarPath);
	console.log(ieDriverPath);
}
exports.dump = module.exports.dump = dump;

/**
 *
 * @param callback
 */
function start (browser, callback) {
	//process env. selenium requires 'SELENIUM_SERVER_JAR' & 'PATH' ENV have set proper way.
	//ref : https://www.npmjs.org/package/selenium-webdriver
	process.env.SELENIUM_SERVER_JAR = seleniumJarPath;
	process.env.PATH = process.env.PATH + pathSep + fs.realpathSync(seleniumPath);

	if (browser === 'ie') {
		//start selenium server
		//selenium driver won't find IE driver without -Dwebdriver.ie.driver option.
		//in case of the other browsers (ex: chrome, ff ...), starting server can be omitted.
		var server = new SeleniumServer(seleniumJarPath, {
			port: 4444,
			args: ['-Dwebdriver.ie.driver=' + fs.realpathSync(ieDriverPath)]
		});
		server.start();

		//init driver
		driver = new webdriver.Builder().
			usingServer(server.address()).
			withCapabilities(webdriver.Capabilities.ie()).
			build();
	} else {
		//init driver
		driver = new webdriver.Builder().
			usingServer(server.address()).
			withCapabilities(webdriver.Capabilities.chrome()).
			build();
	}
	callback(driver, webdriver);
}
exports.start = module.exports.start = start;


/**
 *
 */
function quit () {
	if (driver) {
		driver.quit();
	}
}
exports.quit = module.exports.quit = quit;