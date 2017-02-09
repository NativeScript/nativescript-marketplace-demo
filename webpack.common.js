var webpack = require("webpack");
var nsWebpack = require("nativescript-dev-webpack");
var nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (platform, destinationApp) {
    if (!destinationApp) {
        //Default destination inside platforms/<platform>/...
        destinationApp = nsWebpack.getAppPath(platform);
    }
    var entry = {};
    //Discover entry module from package.json
    entry.bundle = "./" + nsWebpack.getEntryModule();
    //Vendor entry with third party libraries.
    entry.vendor = "./vendor";
    //app.css bundle
    entry["app.css"] = "./app.css";

    var plugins = [
        new ExtractTextPlugin("app.css"),
        //Vendor libs go to the vendor.js chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"]
        }),
        //Define useful constants like TNS_WEBPACK
        new webpack.DefinePlugin({
            global: "global",
            __dirname: "__dirname",
            "global.TNS_WEBPACK": "true",
        }),
        //Copy assets to out dir. Add your own globs as needed.
        new CopyWebpackPlugin([
            { from: "**/*.css" },
            { from: "css/**" },
            { from: "fonts/**" },
            { from: "**/*.jpg" },
            { from: "**/*.png" },
            { from: "**/*.xml" },
        ], { ignore: ["App_Resources/**"] }),
        //Generate a bundle starter script and activate it in package.json
        new nsWebpack.GenerateBundleStarterPlugin([
            "./vendor",
            "./bundle",
        ]),
    ];

    if (process.env.npm_config_uglify) {
        //Work around an Android issue by setting compress = false
        var compress = platform !== "android";
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: nsWebpack.uglifyMangleExcludes,
            },
            compress: compress,
        }));
    }

    return {
        context: path.resolve("./app"),
        target: nativescriptTarget,
        entry: entry,
        output: {
            pathinfo: true,
            path: path.resolve(destinationApp),
            libraryTarget: "commonjs2",
            filename: "[name].js",
        },
        resolve: {
            //Resolve platform-specific modules like module.android.js
            extensions: [
                ".ts",
                ".js",
                ".css",
                "." + platform + ".ts",
                "." + platform + ".js",
                "." + platform + ".css",
            ],
            //Resolve {N} system modules from tns-core-modules
            modules: [
                "node_modules/tns-core-modules",
                "node_modules"
            ]
        },
        node: {
            //Disable node shims that conflict with NativeScript
            "http": false,
            "timers": false,
            "setImmediate": false,
        },
        module: {
            loaders: [
                {
                    test: /\.html$/,
                    loader: "raw-loader"
                },
                // Root app.css file gets extracted with bundled dependencies
                {
                    test: /app\.css$/,
                    loader: ExtractTextPlugin.extract([
                        "resolve-url-loader",
                        "nativescript-css-loader",
                        "nativescript-dev-webpack/platform-css-loader",
                    ]),
                },
                // Other CSS files get bundled using the raw loader
                {
                    test: /\.css$/,
                    exclude: /app\.css$/,
                    loaders: [
                        "raw-loader",
                    ]
                },
                // Compile TypeScript files, replace templateUrl and styleUrls.
                {
                    test: /\.ts$/,
                    loaders: [
                        "awesome-typescript-loader"
                    ]
                },
                // SASS support
                {
                    test: /\.scss$/,
                    loaders: [
                        "raw-loader",
                        "resolve-url-loader",
                        "sass-loader"
                    ]
                },
            ]
        },
        plugins: plugins,
    };
};
