import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepService } from '../../services/step.services';
import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';
import { ModalScopriDiPiùComponent } from './modal-scopri-di-più/modal-scopri-di-più.component';
import { ProfilazioneClienteService } from './service/profilazione-cliente.service';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'pw-step-profilazione-cliente',
    templateUrl: './pw-step-profilazione-cliente.component.html',
    styleUrls: ['./pw-step-profilazione-cliente.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProfilazioneClienteService]
})
export class PwStepProfilazioneClienteComponent implements OnInit {
    showModalScopriDiPiu: boolean = false;
    dataProfilazione: any;
    @Output() public dataProfilazioneCliente = new EventEmitter();

    constructor(
        private stepService: StepService,
        private _dialogHandler: DialogHandlerService,
        private profilazioneClienteService: ProfilazioneClienteService,
        private cdr: ChangeDetectorRef,
        private _loaderService: LoaderService,
        private router: Router,
        public userDataService: UserDataService
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    ngOnInit(): void {
        this.profilazioneClienteService.getProfilazioneCliente().subscribe(
            (data: any) => {
                this.dataProfilazione = data;
                this.dataProfilazioneCliente.emit(data);
                this.cdr.detectChanges();
                this._loaderService.success();
            },
            (error: any) => {
                this._loaderService.success();
                this.router.navigateByUrl(`${this.router.url}/error-critic`);
                console.error('Errore durante il recupero dei dati utente', error);
            }
        );
    }

    openModalInfo(): void {
        this.showModalScopriDiPiu = true;
    }

    closeModal() {
        this.showModalScopriDiPiu = false;
    }

    goToNextStep(): void {
        this.stepService.goToNextStep();
    }

    scopriDiPiu() {
        const ref = this._dialogHandler
            .defaultConfig()
            .open(ModalScopriDiPiùComponent, { allScopriDiPiu: this.dataProfilazione.scopri_di_piu });

        // ref.afterClosed().subscribe(data => {});
    }
}
