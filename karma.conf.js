// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            // require('karma-junit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            jasmine: {
                // Whether to randomize spec execution order, false to tests in the order they are defined.
                random: true,
                // Whether to fail the spec if it ran no expectations. By default a spec that ran no expectations is reported as passed. 
                // Setting this to true will report such spec as a failure.
                failSpecWithNoExpectations: true,

                // you can add configuration options for Jasmine here
                // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
                // for example, you can disable the random execution with `random: false`
                // or set a specific seed with `seed: 4321`
            },
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        jasmineHtmlReporter: {
            suppressAll: true // removes the duplicated traces
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/gameStore'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ],
            watermarks: {
                statements: [50, 75],
                functions: [50, 75],
                branches: [50, 75],
                lines: [50, 75]
            },
            check: {
                emitWarning: false,
                global: {
                    statements: 50,
                    branches: 50,
                    functions: 50,
                    lines: 50,
                    excludes: [
                        'foo/bar/**/*.js'
                    ]
                },
                each: {
                    statements: 50,
                    branches: 50,
                    functions: 50,
                    lines: 50,
                    excludes: [
                        'other/directory/**/*.js'
                    ],
                    overrides: {
                        'baz/component/**/*.js': {
                            statements: 98
                        }
                    }
                }
            },
        },
        colors: true,
        autoWatch: true,
        logLevel: config.LOG_INFO,
        singleRun: true, // tells karma to launch test in one single run within one start of the browser
        reporters: ['progress', 'kjhtml'],
        browsers: ['Chrome', 'ChromeHeadlessNoSandbox'],
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 60000,
        customLaunchers:{
            ChromeHeadlessNoSandbox:{
                base: 'ChromeHeadless',
                flags: [
                    '--disable-web-security',
                    '--disable-gpu',
                    '--no-sandbox'
                ]
            }
        }
    });
};