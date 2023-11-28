var cobrowsing = (function () {
  let cobrowseCssPath = 'https://migrazioneib.bpergroup.net/wizardmigrazione/content/static/less//bper-cobrowsing.css';
  let iconId = 'cobrowseIcon';
  let cobrowseModalId = 'cobrowseModal';
  let cobrowseModalOverlayId = 'cobrowseModalOverlay';
  let cobrowseModalCloseLinkId = 'cobrowseModalCloseLink';
  let cobrowseSecurityFormId = 'cobrowse-security-form';
  
  function initCobrowsing() {
    //crea container per l'icona e modal
    createElements();
    addActions();
  }

  function createElements() {
    container = document.createElement('div');

    var modalContent = '';
    modalContent += '<div id="' + iconId + '" class="cobrowse-icon">';
    modalContent += '</div>';
    modalContent += '<div id="' + cobrowseModalOverlayId +'" class="cobrowse-modal-overlay">';
	modalContent += '</div>';
    modalContent += '<div id="' + cobrowseModalId +'" class="cobrowse-modal">';
	modalContent +=   '<div class="cobrowse-modal-content">';
    modalContent +=     '<div class="cobrowse-modal-content-internal">';
    modalContent +=       '<div class="topSection">';
    modalContent +=         '<span class="Indietro">&lt; <a id="' + cobrowseModalCloseLinkId + '" href="javascript:void(0)">Indietro</a></span>';
    modalContent +=       '</div>';
    modalContent +=       '<div>';
    modalContent +=         '<h1>Condividi lo schermo</h1>';
    modalContent +=         '<p>Chiama il numero verde 800 22 77 88, oppure se sei gi&agrave; al telefono con il Servizio Clienti BPER, inserisci di seguito la chiave di sicurezza che ti ha fornito l\'operatore per avviare la condivisione schermo.</p>';
    modalContent +=       '</div>';
    modalContent +=       '<div id="' + cobrowseSecurityFormId + '">';
    modalContent +=       '</div>';
    modalContent +=     '</div>';
    modalContent +=   '</div>';
    modalContent += '</div>';

    container.innerHTML = container.innerHTML + modalContent;
    document.body.appendChild(container);
  }

  function addActions() {
    document.getElementById(iconId).addEventListener('click', function () {
	  document.getElementById(cobrowseModalOverlayId).style.display = 'block';
      document.getElementById(cobrowseModalId).style.display = 'block';
      let config = createCobrowseConfig();
      ININ.cobrowse.create(config)
        .then(function (result) {
          // Handle success
        })
        .catch(function (err) {
          // Handle failure
        });
    });
    document.getElementById(cobrowseModalCloseLinkId).addEventListener('click', function () {
	  document.getElementById(cobrowseModalOverlayId).style.display = 'none';
      document.getElementById(cobrowseModalId).style.display = 'none';
      document.getElementById(cobrowseSecurityFormId).innerHTML = '';
    });
  }

  function createCobrowseConfig() {

    return {
      // Web chat application URL. Use the correct top-level domain for your Genesys Cloud region, i.e. apps.mypurecloud.ie, apps.mypurecloud.jp, apps.mypurecloud.co.uk.
      "webchatAppUrl": "https://apps.mypurecloud.de/webchat",

      // Web chat service URL
      "webchatServiceUrl": "https://realtime.mypurecloud.de:443",

      // Numeric organization ID
      "orgId": 1234,

      // OrgGuid. Needed for co-browse with voice.
      "orgGuid": "c4548cab-4124-498d-aa9d-40888b87757e",

      // Organization name
      "orgName": "genesys",

      // Log level
      "logLevel": "DEBUG",

      // Locale code
      "locale": "it",

      // CSS class applied to the security key window, but not its contents
      "cssClass": "webchat-frame",

      // Custom style applied to the security key window, but not its contents
      "css": {
        "width": "100%",
        "height": "100%"
      },

      // Optional CSS for styling security key form
      "contentCssUrl": cobrowseCssPath,

      // Element id where the security key form will appear.
      "containerEl": cobrowseSecurityFormId,

      // Set to true to display security key form. Do not include for co-browse with web chat or for PureConnect co-browse with voice.
      "promptForSecurityKey": true
    };
  }

  return {
    init: function () {
      initCobrowsing();
    }
  }
})();

cobrowsing.init();