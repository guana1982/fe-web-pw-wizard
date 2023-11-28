import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepService } from '../../services/step.services';
import { IdentificazioneClienteService } from './service/identificazione-cliente.service';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { UserDataService } from '../../services/user-data.service';
@Component({
    selector: 'pw-step-identificazione-cliente',
    templateUrl: './pw-step-identificazione-cliente.component.html',
    styleUrls: ['./pw-step-identificazione-cliente.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [IdentificazioneClienteService]
})
export class PwStepIdentificazioneClienteComponent implements OnInit {
    @Input() allDataIdentifyUtente: any;
    showFirstModal: boolean = false;
    emailUtente: string;
    datiUtente: any;

    constructor(
        private stepService: StepService,
        public identificazioneClienteService: IdentificazioneClienteService,
        public _loaderService: LoaderService,
        private cdr: ChangeDetectorRef,
        public userDataService: UserDataService
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    ngOnInit(): void {
        if (this.allDataIdentifyUtente && this.allDataIdentifyUtente.contatti.certificazione_mail) {
            this.identificazioneClienteService.setShowVerificaEmail(true);
            this.identificazioneClienteService.hideModifyEmail = true;
        }
    }

    goToNextStep(): void {
        this._loaderService.loading();
        this.stepService.goToNextStep();
    }

    closeFirstModal() {
        this.showFirstModal = false;
    }

    closeSecondModal() {
        this.showFirstModal = false;
        // TODO: Fare il controllo al db tramite la variabile "emailUtente" per restituirmi un booleano e settare la VerificaEmail
        this.identificazioneClienteService.setShowVerificaEmail(false);
        this.identificazioneClienteService.hideModifyEmail = false;
    }

    modifyEmail() {
        this.showFirstModal = true;
    }
}
