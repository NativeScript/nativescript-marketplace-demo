var path = require("path");
var shelljs = require("shelljs");

module.exports = function() {
	shelljs.cp('-f', 'app/App_Resources/iOS/Info.plist', 'platforms/ios/nativescriptmarketplacedemo/nativescriptmarketplacedemo-Info.plist');
}