module.exports = {
    testMatch: [
        // "**/__tests__/**/*.+(ts|tsx|js)",
        "**/**/?(*.)+(test).+(ts)",
        //   "biz/book/Book.test.ts",
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "test/(.*)": "<rootDir>/test/$1",
    },
    collectCoverage: true,
    // collectCoverage: false,
    collectCoverageFrom: [
        "./biz/**/*.{js,ts}",
        "./routes/**/*.{js,ts}",
    ],

    coverageDirectory: 'reports/unit/coverage',
    coverageThreshold: {
        // @note change coverageThreshold
        global: {
            "branches": 1,
            "functions": 1,
            "lines": 1,
            "statements": 1
        }
    },
    reporters: [
        'default',
        [
            'jest-junit',
            // https://www.npmjs.com/package/jest-junit#configuration
            {
                outputDirectory: 'reports',
                outputName: 'result.xml'
            }
        ],
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report",
            outputPath: 'reports/unit/result.html'
        }]
    ],
};