import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StepService } from '../../services/step.services';
import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';
import { ModalInfoSicurezzaComponent } from './modal-info-sicurezza/modal-info-sicurezza.component';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'pw-step-riepilogo',
    templateUrl: './pw-step-riepilogo.component.html',
    styleUrls: ['./pw-step-riepilogo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PwStepRiepilogoComponent implements OnInit {
    @Input() allDatiAnagraficaCliente: any;
    @Input() allDatiProfilazioneCliente: any;

    constructor(
        private stepService: StepService,
        private _dialogHandler: DialogHandlerService,
        public _loaderService: LoaderService,
        public userDataService: UserDataService
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    ngOnInit(): void {
        console.log('allDatiAnagraficaCliente:', this.allDatiAnagraficaCliente);
        console.log('allDatiProfilazioneCliente:', this.allDatiProfilazioneCliente);
    }

    openModalInfo(): void {
        /* const config: MatDialogConfig = {
        maxHeight: '500px',
        maxWidth: '600px'
    }; */
        // const ref =
        this._dialogHandler.defaultConfig().open(ModalInfoSicurezzaComponent, { ciccio: 'pasticcio' });

        // ref.afterClosed().subscribe(data => {
        //     console.log('onClose -> ', data);
        // });
    }

    goToNextStep(): void {
        this._loaderService.success();
        this.stepService.goToNextStep();
    }
}
