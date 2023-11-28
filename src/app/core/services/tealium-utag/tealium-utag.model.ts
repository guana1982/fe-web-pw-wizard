
/**
 * 
 *  @param     page_id          DEPRECATO. Sarà rimosso per favorire la prop su this del service. Identificativo di pagina dove scaturisce l'evento
 *  @param     event_category   Categoria che definisce l'evento. Es. link, download, ecc..
 *  @param     event_action     Azione che scaturisce l'evento. Es. click
 *  @param     event_label      Opzionale. Label per ulteriore definizione dell'evento
 *  @param     event_mapped     Opzionale. Flag utilizzata per definire lo stato del messaggio di errore su cms
 */
export interface UTagLinkDataModel {
    page_id?: string;
    event_category: string;
    event_action: string;
    event_label?: string;
    error_mapped?: 'Y' | 'N';
}

/**
 * 
 *  @param     page_id           DEPRECATO. Sarà rimosso per favorire la prop su this del service. Identificativo di pagina dove scaturisce l'evento
 *  @param     utente_abi_banca  Codice ABI Banca
 *  @param     from              Opzionale. Entry point della pagina. Es. menu-laterale per navigazioni da menù laterale
 */
export interface UTagViewDataModelInput {
    page_id?: string;
    utente_abi_banca: string;
    from?: string;
}

/**
 * 
 *  @param     page_id           DEPRECATO. Sarà rimosso per favorire la prop su this del service. Identificativo di pagina dove scaturisce l'evento
 *  @param     from              Opzionale. Entry point della pagina. Es. menu-laterale per navigazioni da menù laterale
 */
export type UTagViewDataModel = Omit<UTagViewDataModelInput, 'utente_abi_banca'>;