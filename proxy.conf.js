const PROXY_CONFIG = [
    {
        context: [
            '/bffe-cms',
            '/bffe-cards',
            "/bffe-finance",
            '/bffe-payments',
            "/bffe-phone-banking",
            '/bffe-products',
            "/bffe-rata-in-conto",
            '/bffe-user-data',
            '/bffe-user-security',
            "/cms-npm-static",
            "/pkmslogout",
        ],
        // SVIL
         target: 'http://172.28.135.72',
        // STAGE
        // target: 'https://172.31.21.58',
        // SVIL EVO
        // target: 'http://172.28.135.72:82',
        // STAGE EVO
        // target: 'https://172.31.16.44',
        secure: false,
        bypass: function (req, res, proxyOptions) {
            console.log('bypassing the proxy -> ');
        }
    },
    {
        context: [
            '/pl-multic-sca',
            '/pl-multic-feq'
        ],
        // SVIL
         target: 'http://172.28.135.72',
        // STAGE
        // target: 'https://172.31.21.58',
        // SVIL EVO
        // target: 'http://172.28.135.72:82',
        // STAGE EVO
        // target: 'https://172.31.16.44',
        secure: false,
        bypass: function (req, res, proxyOptions) {
            console.log('[SCA] bypassing the proxy -> ');
        }
    }
];

module.exports = PROXY_CONFIG;
