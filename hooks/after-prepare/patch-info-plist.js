var path = require("path");
var shelljs = require("shelljs");

module.exports = function() {
	try {
		shelljs.cp('-f', 'app/App_Resources/iOS/Info.plist', 'platforms/ios/nativescriptmarketplacedemo/nativescriptmarketplacedemo-Info.plist');
	} catch(e) {
		console.log("patch-info-plist: " + e);
	}
}
