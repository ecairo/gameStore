module.exports = {
    preset: 'jest-preset-angular',
    testMatch: ['**/*.snapshot.jest.ts'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
};
