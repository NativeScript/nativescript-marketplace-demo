var path = require("path");
var fs = require("fs");

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    var nsDistPath = process.env.NSDIST || './deps/NativeScript/bin/dist';

    var androidAvd = grunt.option('avd') || "nexus"
    var genyDevice = grunt.option('geny') || "nexus7"
    var iOSDevice = grunt.option('device') || "iPhone-6"
    var androidPlatfrom = "platforms/android/";

    var hasAndroidPlatform = false;
    try {
        hasAndroidPlatform = fs.statSync(androidPlatfrom) && fs.statSync(androidPlatfrom).isDirectory();
    }
    catch (e) {
        // ...
    }

    grunt.initConfig({
        ts: {
            build: {
                tsconfig: './app/tsconfig.json',
                options: {
                    fast: "never",
                    compiler: "node_modules/typescript/bin/tsc"
                },
            },
        },
        copy: {
            widgets: {
                src: "widgets.jar",
                dest: path.join(androidPlatfrom, "libs") + "/",
                cwd: "deps/android-widgets",
                expand: true
            }
        },
        clean: {
            app: {
                cwd: 'app',
                expand: true,
                src: [
                    '**/*.js',
                    '**/*.map',
                ]
            },
            nodeModulesGz: {
                // HACK: Work around a {N} CLI bug  that prevents you from using
                // NPM packages containing *.gz files.
                // https://github.com/NativeScript/nativescript-cli/issues/393
                expand: true,
                cwd: './node_modules',
                src: [
                    '**/*.gz',
                ]
            },
        },
        shell: {
            depNSInit: {
                command: [
                    'npm install',
                    'grunt --no-runtslint',
                ].join('&&'),
                options: {
                    execOptions: {
                        cwd: 'deps/NativeScript',
                    }
                }
            },
            localInstallModules: {
                command: "npm install \"<%= nsPackagePath %>\""
            },
            emulateGeny: {
                command: "tns emulate android --geny '" + genyDevice + "'"
            },
            emulateAndroid: {
                command: "tns emulate android --avd '" + androidAvd + "'"
            },
            emulateIOS: {
                command: "tns emulate ios --device '" + iOSDevice + "'"
            },
            removeAndroid: {
                command: "tns platform remove android"
            },
            addAndroid: {
                command: "tns platform add android"
            }
        }
    });

    grunt.registerTask("updateModules", [
        "getNSPackage",
        "shell:localInstallModules",
    ]);

    grunt.registerTask("getNSPackage", function () {
        var packageFiles = grunt.file.expand({
            cwd: nsDistPath
        }, [
                'tns-core-modules*.tgz'
            ]);
        var nsPackagePath = path.join(nsDistPath, packageFiles[0]);
        grunt.config('nsPackagePath', nsPackagePath);
    });

    grunt.registerTask("app", [
        "ts:build",
    ]);

    // Copy custom version of widgets.jar to be up to date
    grunt.registerTask("fix-android-widgets", hasAndroidPlatform ? ["copy:widgets"] : [])
    grunt.registerTask("prepare", [
        "shell:depNSInit",
        "updateModules",
        "clean:nodeModulesGz",
        "fix-android-widgets"
    ]);
    
    grunt.registerTask("app-full", [
        "clean:app",
        "app",
    ]);

    grunt.registerTask("refresh-android", ["shell:removeAndroid", "shell:addAndroid", "fix-android-widgets"])
    grunt.registerTask("run-android", ["app", "shell:emulateAndroid"])
    grunt.registerTask("run-ios", ["app", "shell:emulateIOS"])
}
