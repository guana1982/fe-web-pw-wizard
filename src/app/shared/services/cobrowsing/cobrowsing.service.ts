import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CobrowsingService {
    private cobrowseCssPath = 'https://migrazioneib.bpergroup.net/wizardmigrazione/content/static/less//bper-cobrowsing.css';
    private iconId = 'cobrowseIcon';
    private cobrowseModalId = 'cobrowseModal';
    private cobrowseModalOverlayId = 'cobrowseModalOverlay';
    public cobrowseModalCloseLinkId = 'cobrowseModalCloseLink';
    private cobrowseSecurityFormId = 'cobrowse-security-form';
    public cobrowseElementsHTML: string;

    constructor() {}

    initCobrowsing() {
        this.createElements();
        this.addActions();
    }

    private createElements() {
        const container = document.createElement('div');

        let modalContent = '';
        modalContent += `<div id="${this.iconId}" class="cobrowse-icon"></div>`;
        modalContent += `<div id="${this.cobrowseModalOverlayId}" class="cobrowse-modal-overlay"></div>`;
        modalContent += `<div id="${this.cobrowseModalId}" class="cobrowse-modal">`;
        modalContent += '<div class="cobrowse-modal-content">';
        modalContent += '<div class="cobrowse-modal-content-internal">';
        modalContent += '<div class="topSection">';
        modalContent += '</div>';
        modalContent += '<div>';
        modalContent += '<h2>Condividi lo schermo</h2>';
        modalContent +=
            "<p>Chiama il numero verde 800 22 77 88, oppure se sei gi&agrave; al telefono con il Servizio Clienti BPER, inserisci di seguito la chiave di sicurezza che ti ha fornito l'operatore per avviare la condivisione schermo.</p>";
        modalContent += '</div>';
        modalContent += `<div id="${this.cobrowseSecurityFormId}"></div>`;
        modalContent += '</div>';
        modalContent += '</div>';
        modalContent += '</div>';

        container.innerHTML = container.innerHTML + modalContent;
        this.cobrowseElementsHTML = container.innerHTML;
    }

    private addActions() {
        document.getElementById(this.iconId)?.addEventListener('click', () => {
            document.getElementById(this.cobrowseModalOverlayId)!.style.display = 'block';
            document.getElementById(this.cobrowseModalId)!.style.display = 'block';
            const config = this.createCobrowseConfig();
            this.createCobrowse(config)
                .then(result => {
                    // Handle success
                })
                .catch(err => {
                    // Handle failure
                });
        });

        document.getElementById(this.cobrowseModalCloseLinkId)?.addEventListener('click', () => {
            document.getElementById(this.cobrowseModalOverlayId)!.style.display = 'none';
            document.getElementById(this.cobrowseModalId)!.style.display = 'none';
            document.getElementById(this.cobrowseSecurityFormId).innerHTML = '';
        });
    }

    public createCobrowseConfig() {
        return {
            // Web chat application URL. Use the correct top-level domain for your Genesys Cloud region, i.e. apps.mypurecloud.ie, apps.mypurecloud.jp, apps.mypurecloud.co.uk.
            webchatAppUrl: 'https://apps.mypurecloud.de/webchat',

            // Web chat service URL
            webchatServiceUrl: 'https://realtime.mypurecloud.de:443',

            // Numeric organization ID
            orgId: 1234,

            // OrgGuid. Needed for co-browse with voice.
            orgGuid: 'c4548cab-4124-498d-aa9d-40888b87757e',

            // Organization name
            orgName: 'genesys',

            // Log level
            logLevel: 'DEBUG',

            // Locale code
            locale: 'it',

            // CSS class applied to the security key window, but not its contents
            cssClass: 'webchat-frame',

            // Custom style applied to the security key window, but not its contents
            css: {
                width: '100%',
                height: '100%'
            },

            // Optional CSS for styling security key form
            contentCssUrl: this.cobrowseCssPath,

            // Element id where the security key form will appear.
            containerEl: this.cobrowseSecurityFormId,

            // Set to true to display security key form. Do not include for co-browse with web chat or for PureConnect co-browse with voice.
            promptForSecurityKey: true
        };
    }

    private createCobrowse(config: any): Promise<any> {
        // Implement the logic for creating the cobrowsing functionality here.
        // Since this part involves external libraries/APIs, you will need to adapt this
        // according to the specifics of the Cobrowsing library you're using.

        // For now, I'll just return a resolved Promise as a placeholder.
        return Promise.resolve('Cobrowsing created successfully.');
    }
}
