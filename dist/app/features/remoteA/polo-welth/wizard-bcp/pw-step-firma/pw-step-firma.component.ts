import {
    BperFirmaComponent,
    BperFirmaService,
    IBperFirmaDocumentazioneDataSource,
    IBperFirmaTutorialDataSource,
    IbperFirmaConfermaProcessoDataSource,
    IbperFirmaConfermaPuntiDataSource,
    IbperFirmaData,
    IbperFirmaEmissioneCertificatoDataSource,
    IbperFirmaInserimentoOtpDataSource,
    IbperFirmaRichiestaCertificatoDataSource
} from '@bper/firma-feq-fe';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { StepService } from '../../services/step.services';
import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';
import { InserimentoOtpService } from './firma-services/inserimento-otp.service';
import { ConfermaProcessoService } from './firma-services/conferma-processo.service';
import { ConfermaPuntiService } from './firma-services/conferma-punti.service';
import { DocumentazioneService } from './firma-services/documentazione.service';
import { EmissioneCertificatoService } from './firma-services/emissione-certificato.service';
import { RichiestaCertificatoService } from './firma-services/richiesta-certificato.service';
import { TutorialService } from './firma-services/tutorial.service';
import { LoaderService } from '@bper/npm-core/utilities/loader';
@Component({
    selector: 'pw-step-firma',
    templateUrl: './pw-step-firma.component.html',
    styleUrls: ['./pw-step-firma.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        InserimentoOtpService,
        ConfermaProcessoService,
        ConfermaPuntiService,
        DocumentazioneService,
        EmissioneCertificatoService,
        RichiestaCertificatoService,
        TutorialService
    ]
})
export class PwStepFirmaComponent implements OnInit {
    @ViewChild('bperFirma') bperFirmaComponent: BperFirmaComponent;
    list: any = [];
    confermaPuntiDataSource!: IbperFirmaConfermaPuntiDataSource;
    confermaProcessoDataSource!: IbperFirmaConfermaProcessoDataSource;
    documentazioneDataSource!: IBperFirmaDocumentazioneDataSource;
    emissioneCertificatoDataSource!: IbperFirmaEmissioneCertificatoDataSource;
    richiestaCertificatoDataSource!: IbperFirmaRichiestaCertificatoDataSource;
    inserimentoOtpDataSource!: IbperFirmaInserimentoOtpDataSource;
    tutorialDataSource!: IBperFirmaTutorialDataSource;
    data!: IbperFirmaData;
    intervalId: any;

    constructor(
        private inserimentoOtpAppService: InserimentoOtpService,
        private confermaPuntiAppService: ConfermaPuntiService,
        private confermaProcessoAppService: ConfermaProcessoService,
        private documentazioneAppService: DocumentazioneService,
        private emissioneCertificatoAppService: EmissioneCertificatoService,
        private richiestaCertificatoAppService: RichiestaCertificatoService,
        private tutorialAppService: TutorialService,
        private readonly bperFirmaService: BperFirmaService,
        private stepService: StepService,
        public _loaderService: LoaderService,
        private cdr: ChangeDetectorRef
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.inserimentoOtpDataSource = this.inserimentoOtpAppService;
        this.confermaPuntiDataSource = this.confermaPuntiAppService;
        this.confermaProcessoDataSource = this.confermaProcessoAppService;
        this.documentazioneDataSource = this.documentazioneAppService;
        this.emissioneCertificatoDataSource = this.emissioneCertificatoAppService;
        this.richiestaCertificatoDataSource = this.richiestaCertificatoAppService;
        this.tutorialDataSource = this.tutorialAppService;
        this.data = {
            idPratica: '423330BB00004000010000044022',
            millisecondsToClose: 5000,
            skipTutorial: false,
            documentLink: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'
        };
        // TODO: Prelevare da bffe
    }

    ngOnInit(): void {
        this.openSignModal();

        this.intervalId = setInterval(() => {
            this._loaderService.success();
        }, 0);
    }

    openSignModal(): void {
        // METODO 1: Richiamo il metodo startSignature() esposto dal componente
        // this.bperFirmaComponent.startSignature();
        // METODO 2: Richiamo il metodo startSignature() esposto dal service
        setTimeout(() => {
            this.bperFirmaService.startSignature();
        }, 0);
    }

    onClose(event): void {
        console.log('Processo modale chiuso con esito:', event);
        if (event.status == 'success' && event.res) {
            clearInterval(this.intervalId);
            this.stepService.goToNextStep();
        }

        if (event.event == 'userAborted' && !event.res && event.status == 'negative') {
            this.stepService.setCurrentStepIndex(4);
        }
    }
}
