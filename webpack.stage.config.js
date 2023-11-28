const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const hostMfeConfig = require('./webpack.common.config');

const mfPlugin = withModuleFederationPlugin({
    ...hostMfeConfig,
    remotes: {
        mfeRataInConto: '/swb/remoteEntry.js'
    }

});

module.exports = {
    ...mfPlugin
};
