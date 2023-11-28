import { cloneDeep } from 'lodash-es';

export interface OpenPanel {
    readonly isPanelOpen;
    readonly panelFactory;
    sidePanelContainer;
    // resolver: ComponentFactoryResolver;
    openPanel(panelType: string, panelData: any): void;
    closeAllPanel?(): void;
}

/** OPENS Panels
 * alla chiusura:
 * - distuggo il componente
 * - rimuovo la sottoscrizione
 * - setto lo state isPanelOpen a false (chiuso)
 *
 * REQUISITI:
 * l'oggetto, o l'istanza di classe sulla quale viene invocata la funzione
 * deve avere le seguenti property
 *
 *  - this.isPanelOpen        oggetto contenente booleani che indicano se il pannello e aperto o chiuso
 *  - this.sidePanelContainer riferimento al pannello @ViewChild
 *  - this.resolver           riferimento al ComponentFactoryResolver per la creazione dinamica del component
 *
 * @param  {string} panelType   tipo di pannello da aprire
 * @param  {any} panelData      dati da passare al pannello
 */
export function openPanel(panelType: string, panelData: any): void {
    // se il pannello e' gia' aperto non lo riapro
    if (!!this.isPanelOpen[panelType]) {
        return;
    }
    console.log(this);

    // in alcuni casi e' possibile aprire un secondo panel
    // pur avendone uno gia' aperto, quindi controllo e li chiudo
    Object.keys(this.isPanelOpen).forEach(key => {
        this.isPanelOpen[key] = false;
    });

    this.sidePanelContainer.clear();
    const panelComponent = this.sidePanelContainer.createComponent(this.panelFactory[panelType]);

    // passaggio dei dati al pannello
    panelComponent.instance[panelType] = cloneDeep(panelData);

    const panelSubscription = panelComponent.instance.togglePanel.subscribe(() => {
        panelSubscription.unsubscribe();
        panelComponent.destroy();
        this.isPanelOpen[panelType] = false;
    });

    this.isPanelOpen[panelType] = true;
}

export function closeAllPanel(): void {
    Object.keys(this.isPanelOpen).forEach(key => {
        this.isPanelOpen[key] = false;
    });
    this.sidePanelContainer ? this.sidePanelContainer.clear() : null;
}
