const { share } = require('@angular-architects/module-federation/webpack');

const hostMfeConfig = {
    name: 'mfeWizardSwb',

    exposes: {
        './mfeWizardTestModule': './src/app/features/remoteA/remoteA.modules.ts'
    },

    shared: share({
        '@angular/core': { singleton: true, requiredVersion: '>=14.0.0 <16.3.0' },
        '@angular/common': { singleton: true, requiredVersion: '>=14.0.0 < 16.3.0' },
        '@angular/router': { singleton: true, requiredVersion: '>=14.0.0 < 16.3.0' },
        '@angular/cdk': { singleton: true, requiredVersion: '>=14.0.0 < 16.3.0' },
        '@angular/forms': { singleton: true, requiredVersion: '>=14.0.0 < 16.3.0' },
        '@angular/material': { singleton: true, requiredVersion: '>=14.0.0 < 16.3.0' },
        '@ngrx/effects': { singleton: true, requiredVersion: '>=14.0.0 < 16.4.0' },
        '@ngrx/entity': { singleton: true, requiredVersion: '>=14.0.0 < 16.4.0' },
        '@ngrx/router-store': { singleton: true, requiredVersion: '>=14.0.0 < 16.4.0' },
        '@ngrx/store': { singleton: true, requiredVersion: '>=14.0.0 < 16.4.0' },
        '@ngrx/store-devtools': { singleton: true, requiredVersion: '>=14.0.0 < 16.4.0' },
        '@bper/npm-core': { singleton: true, requiredVersion: '>=0.0.1 <2.0.0' },
        '@bper/firma-feq-fe': { singleton: true, requiredVersion: '>=0.0.1 <2.0.0' },
        '@ngx-translate/core': { singleton: true, requiredVersion: '>=14.0.0 < 16.3.0' },
    }),

    sharedMappings: ['@shared']
};

module.exports = {
    ...hostMfeConfig
};
