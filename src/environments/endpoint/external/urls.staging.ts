export const externalUrls = {
    NPM_PUBLIC: '/auth/#/auth/login',
    NPM_PUBLIC_LOGOUT: '/auth/#/auth/logout',
    NPM_PUBLIC_SESSION_EXPIRED: '/auth/#/auth/sessione-scaduta',
    NPM_PHONE_BANKING: '/phone-banking/',
    NPM_PHONE_BANKING_RUBRICA: '/phone-banking/rubrica',
    TEALIUM: '//tags.tiqcdn.com/utag/bper/smartwebnpm/qa/utag.js',
    TRADING_ONLINE_LOGOUT:
        'https://tradingonline-test.bpergroup.net/pkmslogout',
    TRADING_ONLINE_LOGOUT_PHONE_BANKING:
        'https://intrawsealcol.gbbper.priv/bffe-phonetol/private/main/',
    TRADING_ONLINE_PORTAL:
        'https://tradingonline-test.bpergroup.net/bper-tol-main-theme/staticResources/npm/index.html',
    TRADING_ONLINE_PORTAL_PHONE_BANKING: (u, bank) =>
        `https://intrawsealcol.gbbper.priv/trading_phone_npm/phone.html?u=${u}&bank=${bank}`,
    BANCO_DI_SARDEGNA_URL: 'https://www.bancosardegna.it',
    BANCO_CESARE_PONTI_URL: 'http://bancacesareponti.it',
    BLINK_BASE_PATH: 'https://intrawsealcol.gbbper.priv',
    HB_BPER_BASE_PATH: 'https://homebanking-stag.bpergroup.net',
};
