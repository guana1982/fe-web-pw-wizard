/**
 *  Definisce tutte le sezioni informative/normative identificate e ne descrive la funzionalità
 */
export enum CmsInfoSections {
    '' = ''
}

/**
 *  Definisce tutte le sezioni editoriali identificate e ne descrive la funzionalità
 */
export enum CmsEditorialSections {
    /** [MOBILE_ONLY] carosello nella sezione prodotti */
    PRODOTTI = 'PRODOTTI',
    /** [MOBILE_ONLY] carosello nella sezione prodotti della pagina FAQ */
    FAQ_PRODOTTI = 'FAQ_PRODOTTI',
    
    LOGIN_S1_CAROCOMM = 'LOGIN_S1_CAROCOMM',
    LOGIN_S2_SHORTCUTAIUTO = 'LOGIN_S2_SHORTCUTAIUTO',
    LOGIN_S3_SUPPORTO = 'LOGIN_S3_SUPPORTO',
    LOGIN_S4_LINKAPP = 'LOGIN_S4_LINKAPP',
    LOGIN_S5_PROMO = 'LOGIN_S5_PROMO',
    LOGOUT_S1_CAROCOMM = 'LOGOUT_S1_CAROCOMM',
    LOGOUT_S2_SHORTCUTAIUTO = 'LOGOUT_S2_SHORTCUTAIUTO',
    LOGOUT_S3_LINKAPP = 'LOGOUT_S3_LINKAPP',
    SUPPORTO_PREL_TUTORIAL = 'SUPPORTO_PREL_TUTORIAL',
    SUPPORTO_CAROTUTORIAL = 'SUPPORTO_PREL_CAROTUTORIAL',

}

/**
 *  Definisce tutte le sezioni generiche identificate e ne descrive la funzionalità
 */

export enum CmsGenericSections {
  /** Cosa vuoi fare oggi? */
  HOME_TODAY = 'HOME_S1_SHORTCUTTODAY',
  PRELOGIN_CONF = 'BLOCK_PRELOGIN',
  SUPPORTO_GUIDE_DETAIL_PREL = 'SUPPORTO_PREL_<SECTIONID>_<FAQID>_GUIDEDETAIL',
  SUPPORTO_PREL_SHORTCUTAIUTO = 'SUPPORTO_PREL_SHORTCUTAIUTO',
  SUPPORTO_SHORTCUTFUNZ = 'SUPPORTO_PREL_SHORTCUTFUNZMAIN',
  BUSINESS_INFO = 'BUSINESS_INFO',
  LOGIN_PAGE_CONF = 'LOGIN_PAGE_CONF',
  RED_IBAN = "RED_IBAN",
  SUPPORTO_SHORTCUTAIUTO = 'SUPPORTO_POSTL_SHORTCUTAIUTO',
}
