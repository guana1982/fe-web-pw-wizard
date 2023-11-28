export const externalUrls = {
    NPM_PUBLIC: 'http://localhost:4300/#/',
    NPM_PUBLIC_LOGOUT: 'http://localhost:4300/#/auth/logout',
    NPM_PUBLIC_SESSION_EXPIRED: 'http://localhost:4300/#/auth/sessione-scaduta',
    NPM_PHONE_BANKING: 'http://localhost:4500/',
    NPM_PHONE_BANKING_RUBRICA: 'http://localhost:4500/rubrica',
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
    BLINK_BASE_PATH: '',
    HB_BPER_BASE_PATH: '',
    
};
