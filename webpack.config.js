var bundler = require("nativescript-dev-webpack");
var path = require("path");

module.exports = bundler.getConfig({
    // TODO: add project-specific webpack settings here...
    module: {
        loaders: [
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    },
});
