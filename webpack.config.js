const { resolve, join } = require("path");

const webpack = require("webpack");
const nsWebpack = require("nativescript-dev-webpack");
const nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = env => {
    const platform = getPlatform(env);
    const path = resolve(nsWebpack.getAppPath(platform));

    const entry = {
        bundle: `./${nsWebpack.getEntryModule()}`,
        vendor: `./vendor`
    };

    const rules = getRules(platform);
    const plugins = getPlugins(platform, env);
    const extensions = getExtensions(platform);

    const config = {
        context: resolve("./app"),
        target: nativescriptTarget,
        entry,
        output: {
            pathinfo: true,
            path,
            libraryTarget: "commonjs2",
            filename: "[name].js",
        },
        resolve: {
            extensions,

            // Resolve {N} system modules from tns-core-modules
            modules: [
                "node_modules/tns-core-modules",
                "node_modules",
            ],
            alias: {
                '~': resolve("./app")
            }
        },
        node: {
            // Disable node shims that conflict with NativeScript
            "http": false,
            "timers": false,
            "setImmediate": false,
            "fs": "empty",
        },
        module: { rules },
        plugins,
    };

    if (env.snapshot) {
        plugins.push(new nsWebpack.NativeScriptSnapshotPlugin({
            chunk: "vendor",
            projectRoot: __dirname,
            webpackConfig: config,
            targetArchs: ["arm", "arm64", "ia32"],
            tnsJavaClassesOptions: { packages: ["tns-core-modules" ] },
            useLibs: false
        }));
    }

    return config;
};


function getPlatform(env) {
    return env.android ? "android" :
        env.ios ? "ios" :
        () => { throw new Error("You need to provide a target platform!") };
}

const excludes = {
    ios: [/\.android\./, /App_Resources/, /app\.ios\.css/, /app\.android\.css/, /app-common\.css/],
    android: [/\.ios\./, /App_Resources/, /app\.ios\.css/, /app\.android\.css/, /app-common\.css/]
}

function getRules(platform) {
    return [
        {
            test: /\.(html|xml|css|xml)$/,
            loader: "file-loader",
            exclude: [excludes[platform]],
            query: {
                regExp: /^.*(\/[^\.]*)(\.ios|\.android)?(\.css|\.xml)$/,
                name: "[path][1][3]",
                outputPath: "",
                publicPath: ""
            }
        },
        {
            test: /(app\.ios\.css|app\.android\.css|app-common\.css)$/,
            use: "raw-loader"
        },
        // SASS support
        {
            test: /\.scss$/,
            use: [
                "raw-loader",
                "resolve-url-loader",
                "sass-loader",
            ]
        },
        // Compile TypeScript files, replace templateUrl and styleUrls.
        {
            test: /\.(ts|tsx)$/,
            loaders: [
                "awesome-typescript-loader",
            ]
        }
    ];
}

function getPlugins(platform, env) {
    let plugins = [
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            generateStatsFile: true,
            reportFilename: join(__dirname, "report", `${platform}-report.html`),
            statsFilename: join(__dirname, "report", `${platform}-stats.json`),
        }),

        // Vendor libs go to the vendor.js chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"],
        }),

        // Define useful constants like TNS_WEBPACK
        new webpack.DefinePlugin({
            "global.TNS_WEBPACK": "true"
        }),

        // Generate a bundle starter script and activate it in package.json
        new nsWebpack.GenerateBundleStarterPlugin([
            "./vendor",
            "./bundle",
        ]),

        new CopyWebpackPlugin([
            // This should rarly be used, in the examples the users can "view code" so we need the source copied
            { from: "examples/**/*.js" }
        ])
    ];
    
    if (env.uglify) {
        plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));

        // Work around an Android issue by setting compress = false
        const compress = platform !== "android";
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: { except: nsWebpack.uglifyMangleExcludes.concat(["ExamplePage"]) },
            compress,
        }));
    }

    return plugins;
}

// Resolve platform-specific modules like module.android.js
function getExtensions(platform) {
    return Object.freeze([
        `.${platform}.tsx`,
        `.tsx`,
        `.${platform}.ts`,
        `.${platform}.js`,
        ".ts",
        ".js",
        `.${platform}.css`,
        `.css`,
    ]);
}
