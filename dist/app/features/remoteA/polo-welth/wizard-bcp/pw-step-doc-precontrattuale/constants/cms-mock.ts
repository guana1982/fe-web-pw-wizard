import { CMSId } from '../models/generics/cms.model';


export const cmsMock = {
    [CMSId.REAL_TIME_ERROR]: {
        image: {
            type: 'error-generic'
        },
        title: 'Le tue informazioni sono preziose!<br> Ci consentiranno di offrirti soluzioni dedicate a te!.',
        description:
            '<p>Se lo desideri, possiamo proporti soluzioni di prodotto alternative a PagaPoi per andare incontro alle tue esigenze.</p>',
        secondaryButtonLabel: 'No, torna alla Home',
        primaryButtonLabel: 'Sì, contattatemi'
    },
    [CMSId.TUTORIAL]: [
        {
            title: 'PagaPoi: paghi quando vuoi!',
            img: 'assets/paga-poi/tutorial.svg',
            description:
                ' <p>Da oggi con PagaPoi potrai<b> dilazionare le spese,</b> una bella comodità!</p><p><b>Come funziona?</b> è semplice: fai i tuoi acquisti, rateizzi la spesa dal tuo Internet Banking e ricevi subito l’accredito.</p>',
            buttonLabel: 'Continua'
        },
        {
            title: "D'ora in poi, c'è PagaPoi",
            img: 'assets/paga-poi/tutorial.svg',
            description:
                ' <p>Richiedere PagaPoi è semplicissimo, ti basta cliccare su <b>“Richiedi ora”</b>. Paghi il servizio <b>solo se lo utilizzi</b>.</p> <br> <span>Condizioni in filiale e nell’area riservata di Smart Web. Valutazione del merito creditizio da parte di Bibanca. Offerta valida fino al 31/12/2023 salvo proroga o chiusura anticipata.</span> <br>',
            buttonLabel: 'Richiedi ora'
        }
    ],
    [CMSId.TUTORIAL_EX_UBI]: [
        {
            title: 'PagaPoi: paghi quando vuoi!',
            img: 'assets/paga-poi/tutorial.svg',
            description:
                '<p>Da oggi il prodotto <b>Rata in conto cambia nome</b>, evolve e ti è sempre più vicino!</b> <br><br><p>Con <b>PagaPoi</b> sarà ancora <b>più semplice</b> rateizzare le tue spese e consultare i tuoi piani rateali: troverai tutto nella <b>sezione PagaPoi</b> alla voce <b>Prodotti</b>.</p>',
            buttonLabel: 'Scopri PagaPoi'
        }
    ],
    [CMSId.START_PRODUCT_ACTIVATION]: {
        image: {
            type: 'image',
            imgUrl: 'assets/bper-svg/ok-illustration.svg'
        },
        title: 'Controlla i tuoi dati.',
        description: 'Per procedere abbiamo bisogno che verifichi le informazioni che abbiamo su di te',
        primaryButtonLabel: 'Continua'
    },
    [CMSId.MODAL_50_PERCENTAGE_LESS_PLAFOND]: {
        image: {
            type: 'warning-gradient'
        },
        title: 'Hai ancora a disposizione PLACEHOLDER_AMOUNT',
        description: '<p>Rateizza le tue spese senza pensieri</p>',
        primaryButtonLabel: 'Aggiungi spese',
        secondaryButtonLabel: 'No grazie'
    },
    [CMSId.MODAL_INFO_ADD_EXPENSES]: {
        image: {
            type: 'warning-gradient'
        },
        title: 'Quali spese puoi rateizzare?',
        description:
            "Puoi rateizzare <b> da 3 fino a 25 mesi </b> le tue spese del mese corrente o del mese preceddente all'attivazione del piano rateale. Bollette, spese mediche, i tuoi acquisti... potrai rateizzare le tue spese ad eccezione, per esempio, delle spese di investimento e per il rimborso di altri finanziamenti o le spese già rateizzate in precedenza.",
        primaryButtonLabel: 'Ok, ho capito'
    },
    [CMSId.MODAL_INFO_CHECK_EXPENSES]: {
        image: {
            type: 'warning-gradient'
        },
        title: 'Controlla le tue spese',
        description: 'Seleziona importi che rientrano nel plafond a te assegnato e rateizza le tue spese in tutta semplicità.',
        primaryButtonLabel: 'Ok, ho capito'
    },
    [CMSId.MODAL_SELECT_MINIMUM_EXPENSES]: {
        image: {
            type: 'warning-gradient'
        },
        title: 'Seleziona un importo di almeno PLACEHOLDER_AMOUNT',
        description:
            'Le spese selezionate non raggiungono il limite minimo previsto da PagaPoi. <br> Per proseguire seleziona altre spese.',
        primaryButtonLabel: 'Ok, ho capito'
    },
    [CMSId.MODAL_PRACTICE_PENDING_TEXT]: {
        text: 'Per procedere, clicca su Riprendi e riparti dal piano precedentemente impostato, completando con i dati ancora in sospeso. Oppure, clicca su Configura nuovo piano per sostituire il piano che hai precedentemente impostato.'
    },
    [CMSId.MODAL_PRACTICE_PENDING_INFORMATIVE_MESSAGE]: {
        message: 'Il tuo piano rateale <b>è stato modificato</b>: alcune delle spese da te selezionate non sono rateizzabili.'
    },
    [CMSId.BANNER_SURVEY]: {
        img: 'assets/paga-poi/ok-illustration.svg',
        title: "<h3>Raccontaci come è andata l'attivazione di PagaPoi</h3>",
        description: "<p>Sulla base dell'esperienza appena conclusa, consiglieresti BPER Banca a parenti o conoscenti?</p>",
        buttonLabel: 'Valuta'
    },
    [CMSId.MODAL_SURVEY]: {
        title: 'Raccontaci come è andata l’attivazione di PagaPoi',
        description:
            "<p>Sulla base dell'esperienza appena conclusa, consiglieresti BPER Banca a parenti o conoscenti?</p><p>(Puoi utilizzare una scala da 0 a 10 dove 0 rappresenta “Sicuramente No” e 10 “Sicuramente Si”)</p>",
        primaryButtonLabel: 'Invia',
        linkActionLabel: 'Clicca qui',
        inputTextLabel: 'Scrivi la tua motivazione'
    },
    [CMSId.MODAL_SEND_INFORMATIVE_SET]: {
        title: 'Come vuoi ricevere il set informativo?',
        description: '<p>Scegli come vuoi salvare la documentazione precontrattuale.</p>',
        image: {
            type: 'warning-gradient'
        },
        secondaryButtonLabel: 'Via email',
        primaryButtonLabel: 'Scarica ora'
    },
    [CMSId.MODAL_SENT_DOCUMENTS]: {
        image: {
            type: 'warning-gradient'
        },
        title: 'Documenti inviati',
        description: 'I documenti sono stati inviati alla tua mail PLACEHOLDER_EMAIL',
        primaryButtonLabel: 'Ok, ho capito'
    },
    [CMSId.MODAL_LESS_ECOLOGICAL_CHOICE]: {
        image: {
            type: 'warning-gradient'
        },
        title: 'Sei sicuro di voler modficare la tua scelta?',
        description:
            'Stai effettuando la scelta meno ecologica, optando di non ricevere la documentazione online. Aiuto anche tu il nostro pianeta.',
        primaryButtonLabel: 'Conferma'
    },
    [CMSId.MODAL_SERVICE_DOWN]: {
        image: {
            type: 'warning-gradient'
        },
        title: 'Questo servizio tornerà attivo il prima possibile.',
        description: 'Saremo veloci, torna presto. Grazie',
        primaryButtonLabel: 'Torna alla Home'
    },
    [CMSId.MODAL_QAV_ERROR]: {
        image: {
            type: 'error-generic'
        },
        title: 'Verifica che sia tutto ok.',
        description:
            '<p>Prima di procedere puoi controllare e camabiare le tue risposte cliccando su indietro.<br> Se pensi sia tutto ok. Clicca su Concludi.</p>',
        primaryButtonLabel: 'Concludi',
        secondaryButtonLabel: 'Indietro'
    },
    [CMSId.MODAL_FEEDBACK]: {
        image: {
            type: 'image',
            imgUrl: 'assets/bper-svg/ok-illustration.svg'
        },
        title: 'Grazie per averci lasciato il tuo feedback',
        description: 'La tua opinione ci aiuterà a migliorare i nostri servizzi',
        primaryButtonLabel: 'Chiudi'
    },
    [CMSId.MODAL_POSITIVE_DELIBERATE]: {
        noCloseAction: true,
        image: {
            type: 'warning-gradient'
        },
        title: 'Il tuo plafond è confermato!',
        description: 'Il plafond a tua disposizione è PLACEHOLDER_PLAFOND.<br><br> Continua per concludere la tua richiesta',
        primaryButtonLabel: 'Firma'
    },
    [CMSId.MODAL_PARTIALLY_POSITIVE_DELIBERATE_CASE_1]: {
        noCloseAction: true,
        image: {
            type: 'warning-gradient'
        },
        title: 'Il tuo plafond: PLACEHOLDER_PLAFOND!',
        description:
            "Abbiamo ridotto l'importo del tuo plafond a seguito di valutazioni Banca. <br> <br> Continua per sottoscrivere PagaPoi.",
        primaryButtonLabel: 'Continua'
    },
    [CMSId.MODAL_PARTIALLY_POSITIVE_DELIBERATE_CASE_2]: {
        noCloseAction: true,
        image: {
            type: 'warning-gradient'
        },
        title: 'Il tuo plafond: {avaiable_plafond}!',
        description:
            "Abbiamo ridotto l'importo del tuo plafond a seguito di valutazioni Banca. <br> <br> Per continuare, <b> modifica le spese </b> del piano per rientrare nel nuovo plafond.",
        primaryButtonLabel: 'Modifica piano rateale'
    },
    [CMSId.NEGATIVE_DELIBERATE]: {
        image: {
            type: 'error-generic'
        },
        title: 'Le tue informazioni sono preziose! Ci consentiranno di offrirti soluzioni dedicate a te!.',
        description:
            "<p>Non ci è possibile completare il processo per attivare PagaPoi.<br> <b><a href='/homepage'>per maggiore dettagli cliccare qui</a></b><br><br></p><p>se lo desideri, possiamo proprorti soluzioni di prodotto alternative a PagaPoi per andare incotro alle tue esigenze</p>",
        secondaryButtonLabel: 'No, torna alla Home',
        primaryButtonLabel: 'Sì, contattatemi'
    },
    [CMSId.ERROR_ATTIVATION]: {
        image: {
            type: 'error-generic'
        },
        title: 'Operazione non conclusa correttamente.',
        description: '<p>Ti chiediamo di riprovare più tardi.</p>',
        primaryButtonLabel: 'Torna alla Home'
    },
    [CMSId.MODAL_THANKSGIVING]: {
        image: {
            type: 'warning-gradient'
        },
        title: 'Grazie per il tuo interessamento',
        description: 'Sarai ricontattato dalla tua filiale.',
        primaryButtonLabel: 'Concludi'
    },
    [CMSId.KYC_WAITING]: {
        image: {
            type: 'info'
        },
        title: "Il documento d'identità è ancora in approvazione",
        description: 'Riceverai una notifica non appena ci sarà un aggiornamento e, se confermato, potrai continuare con la firma',
        primaryButtonLabel: 'Torna alla Home'
    },
    [CMSId.KYC_POSITIVE]: {
        image: {
            type: 'success'
        },
        title: 'Il documento che hai caricato è stato aggiornato con successo!',
        description: 'Puoi continuare con PagoPoi',
        primaryButtonLabel: 'Continua'
    },
    [CMSId.KYC_NEGATIVE]: {
        image: {
            type: 'error-generic'
        },
        title: 'Ops! si è verificato un errore in fase di verifica del tuo documento',
        description: 'Non potrai continuare con PagaPoi. Rivolgiti alla tua filiale',
        primaryButtonLabel: 'Torna alla Home'
    }
};

//TO-Do mettere ctruttura per cms per firma andata a buon fine
