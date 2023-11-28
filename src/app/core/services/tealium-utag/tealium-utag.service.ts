import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UTagLinkDataModel, UTagViewDataModel, UTagViewDataModelInput } from './tealium-utag.model';

const SCRIPT_SRC = environment.externalUrls.TEALIUM;
const DEFAULT_FROM_PARAM = 'body';

@Injectable({ providedIn: 'root' })
export class TealiumUtagService {
    /** property per definire la pagina da cui verranno lanciati gli eventi */
    private _page_id: string;
    /** property per definire il contenuto che si apre sulla pagina e da cui verranno lanciati gli eventi */
    private _page_id_child: string;
    /** property per definire la provenienza per l'accesso in pagina. Resettato al lancio della funzione view */
    private _navigatedFrom: string = DEFAULT_FROM_PARAM;    

    // Typically set "noview" flag (no first page automatic view event) to true for Single Page Apps (SPAs)
    constructor() {
        (window as any).utag_cfg_ovrd = { noview: true };
        (window as any).utag_data = {};
    }

    // Generic script loader with callback
    private _getScript(src: string, callback: () => void) {
        const d = document;
        const fn = () => {};
        const o = { callback: callback || fn };
        let s: any;
        let t: any;

        if (typeof src === 'undefined') {
            return;
        }

        s = d.createElement('script');
        s.language = 'javascript';
        s.type = 'text/javascript';
        s.async = 1;
        s.charset = 'utf-8';
        s.src = src;

        if (typeof o.callback === 'function') {
            if ( d.addEventListener ) {
                s.addEventListener('load', () => {o.callback(); }, false);
            } else {
                // old IE support
                s.onreadystatechange = function(){
                    if (this.readyState === 'complete' || this.readyState === 'loaded'){this.onreadystatechange = null; o.callback(); }
                };
            }
        }
        t = d.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s, t);
    }

    private _track(tealiumEvent: 'view' | 'link', data: UTagViewDataModelInput | UTagLinkDataModel) {
        if ( SCRIPT_SRC === '' ) {
          console.error('[TEALIUM] Config not set.');
          return;
        }

        if( !this._page_id ) {
            console.error('[TEALIUM] Page id not set.');
            return;
        }

        const obj = {...data, page_id: (this._page_id_child || this._page_id || data?.page_id) }

        if( !environment.production ) {
            console.log("[TEALIUM::ACTION] - ",`${tealiumEvent}::${JSON.stringify(obj)}`);
            return;
        }

        if ( ( window as any).utag === undefined ) {
          this._getScript( SCRIPT_SRC, () => {
            ( window as any).utag[tealiumEvent](obj);
          });
        } else {
          ( window as any).utag[tealiumEvent](obj);
        }
    }

    /**
     *    Funzione per tracciamento data layer/pagine visitate
     *
     *      @param data: UTagViewDataModel
     */
    view(data?: UTagViewDataModel ) {
        try {
            const utente_abi_banca = '05387';
            const from = this._navigatedFrom;

            this._track('view', {...data, utente_abi_banca, from});

            /** Reset from dopo l'azione di view */
            this._navigatedFrom = DEFAULT_FROM_PARAM;
        } catch (err) {
            console.error(err);
            throw new Error('[TEALIUM::ERROR] Data view not valid');
        }
    }

    /**
     *    Funzione per tracciamento eventi
     *
     *      @param data: UTagLinkDataModel
     */
    link(data: UTagLinkDataModel) {
        if( !data ) return;

        try {
            this._track('link', {...data});
        } catch (err) {
            console.error(err);
            throw new Error('[TEALIUM][ERROR] link');
        }
    }

    /**
     * Funzione per settare l'id della pagina in cui ci si trova
     * 
     * @param pageId  Page id della pagina caricata
     * 
     * @return        Ritorna l'istanza del service 
     */
    setPageId( pageId: string ) {
        this._page_id = pageId;
        return this;
    }

    /**
     * Funzione per recuperare l'id della pagina in cui ci si trova
     * 
     * @return        Ritorna il pageId 
     */
    getPageId( ) {
        return this._page_id_child || this._page_id;
    }

    /**
     * Funzione per settare l'id della modale e/o contenuto che si sovrappone alla pagina in cui ci si trova
     * 
     * @param pageId  Page id della pagina caricata
     * 
     * @return        Ritorna l'istanza del service 
     */
    setPageIdForChild( pageId: string ) {
        if( !pageId ) return this;

        this._page_id_child = pageId;
        return this;
    }

    /**
     * Funzione per resettare il pageId della pagina in uscita dalla modale
     * 
     * @return        Ritorna l'istanza del service 
     */
    closePageIdForChild() {
        this._page_id_child = null;
        return this;
    }

    /**
     * Funzione per resettare lo stato della page_id
     * 
     * @return        Ritorna l'istanza del service 
     */
    resetPageId() {        
        this._page_id = null;
        this._page_id_child = null;
        return this;
    }

    /**
     * Funzione per definire il punto da cui si proviene per la successiva azione view 
     * 
     * @param from    Sezione della pagina di provenienza
     */
    setNavigatedFrom( from: string ) {
        if( !from ) return;

        this._navigatedFrom = from;
    }
}