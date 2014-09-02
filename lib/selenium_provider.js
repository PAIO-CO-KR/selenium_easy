'use strict';
var fs = require('fs');
var webdriver = require('selenium-webdriver');
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

var seleniumPath = './external_bin/selenium';
var seleniumJarPath = seleniumPath + '/selenium-server-standalone-2.42.2.jar';
var ieDriverPath = seleniumPath + '/IEDriverServer.exe';
var pathSep = /^win/.test(process.platform) ? ';' : ':';


//process env. selenium requires 'SELENIUM_SERVER_JAR' & 'PATH' ENV have set proper way.
//ref : https://www.npmjs.org/package/selenium-webdriver
process.env.SELENIUM_SERVER_JAR = seleniumJarPath;
process.env.PATH = process.env.PATH + pathSep + fs.realpathSync(seleniumPath);

//init driver
var driver = new webdriver.Builder();
//process argv, ie or chrome. the others? fuck off by now.
//start selenium server
//selenium driver won't find IE driver without -Dwebdriver.ie.driver option.
//in case of the other browsers (ex: chrome, ff ...), starting server can be omitted.
var server = new SeleniumServer(seleniumJarPath, {
	port: 4444,
	args: ['-Dwebdriver.ie.driver=' + fs.realpathSync(ieDriverPath)]
});
server.start();

driver = driver.usingServer(server.address()).
	withCapabilities(webdriver.Capabilities.ie()).
	build();


//driver.quit();

