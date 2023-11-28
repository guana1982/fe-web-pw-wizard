export const baseEnvironment = {
    headerChannel: 'IBPR',
    defaultAbi: '05387',
    BDSAbi: '01015',
    BCPAbi: '03084',
    sessionTime: 5 * 60,
    sessionEndingCountdown: 45,
};

export interface ENVIRONMENT {
    /** header da impostare per ogni request che passi da WebSeal */
    headerChannel: string;
    /** ABI di Bper Banca */
    defaultAbi: string;
    /** ABI di Banco di Sardegna */
    BDSAbi: string;
    /** ABI di Banca Cesare Ponti */
    BCPAbi: string;
    /** Durata della sessione */
    sessionTime: number;
    /** Durata countdown prima di chiusura modale sessione in scadenza */
    sessionEndingCountdown: number;
    /** flag che determina se l'ambiente è assimilabile a quello di produzione */
    production: boolean;
    /** flag che determina se l'ambiente prevede l'uso di mock. In ambiente diverso da locale, i mock sono inibiti */
    mock: boolean;
    /** indica se la giunzione di WebSeal è pubblica */
    public: boolean;
    /** endpoint giunzioni BFFE di base. Da estendere localmente con i propri file d'ambiente */
    apiEndPoint: { [key: string]: any };
    /** link esterni applicativo. Da estendere localmente con i propri file d'ambiente */
    externalUrls: { [key: string]: any };
}
