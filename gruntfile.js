var path = require("path");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    var nsDistPath = process.env.NSDIST || './deps/NativeScript/bin/dist';

    var androidAvd = grunt.option('avd') || "nexus"
    var genyDevice = grunt.option('geny') || "nexus7"
    var iOSDevice = grunt.option('device') || "nexus"

    grunt.initConfig({
        ts: {
            build: {
                src: [
                    'app/**/*.ts',
                    'typings/tsd.d.ts',
                ],
                options: {
                    fast: "never",
                    module: "commonjs",
                    target: "es5",
                    sourceMap: true,
                    removeComments: false,
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    compiler: "node_modules/typescript/bin/tsc",
                    noEmitOnError: true
                },
            },
        },
        copy: {
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
                command: "npm install \"" + nsDistPath + "/tns-core-modules-1.3.0.tgz\""
            },
            emulateGeny: {
                command: "tns emulate android --geny '" + genyDevice +"'"
            },
            emulateAndroid: {
                command: "tns emulate android --avd '" + androidAvd +"'"
            },
            emulateIOS: {
                command: "tns emulate ios --device '" + iOSDevice +"'"
            }
        }
    });

    grunt.registerTask("updateModules", [
        "shell:localInstallModules",
    ]);

    grunt.registerTask("app", [
        "ts:build",
    ]);

    grunt.registerTask("prepare", [
        "shell:depNSInit",
        "updateModules",
        "clean:nodeModulesGz",
    ]);

    grunt.registerTask("app-full", [
        "clean:app",
        "app",
    ]);

    grunt.registerTask("run-android", ["app", "shell:emulateAndroid"])
    grunt.registerTask("run-ios", ["app", "shell:emulateIOS"])
}
