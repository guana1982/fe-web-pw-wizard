const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const hostMfeConfig = require('./webpack.common.config');

const mfPlugin = withModuleFederationPlugin({
    ...hostMfeConfig,
    remotes: {
        mfeRataInConto: 'http://localhost:4600/remoteEntry.js'
    },
});

module.exports = {
    ...mfPlugin
};
