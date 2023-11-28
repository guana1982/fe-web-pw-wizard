import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StepService } from '../../services/step.services';
import { ConvalidaCellulareService } from './service/convalida-cellulare.service';
import { CodeUtente } from './models/convalida-cellulare.model';
import { Router } from '@angular/router';
import { LoaderService } from '@bper/npm-core/utilities/loader';

@Component({
    selector: 'pw-step-convalida-cellulare-component',
    templateUrl: './pw-step-convalida-cellulare.component.html',
    styleUrls: ['./pw-step-convalida-cellulare.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ConvalidaCellulareService]
})
export class PwStepConvalidaCellulareComponent {
    @Input() datoIdentificazioneCliente: any;
    setError: string;
    invalidOtp: boolean = false;
    remainingAttempts: number = 6;
    pinValue: any = [];

    constructor(
        private stepService: StepService,
        private convalidaCellulareService: ConvalidaCellulareService,
        private router: Router,
        private _loader: LoaderService
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    onPinChange(pinData: any) {
        if (pinData && pinData.pin) {
            const pinValueArray = pinData.pin.map((pinItem: any) => pinItem.digit || '').slice(0, 6);
            this.pinValue = pinValueArray.join('');
        }
    }

    goToNextStep(): void {
        this._loader.loading();

        if (this.pinValue.length == 6) {
            if (this.remainingAttempts !== 1) {
                this._loader.loading();
                this.stepService.goToNextStep();
                // TODO: Scommentare il codice
                // this.convalidaCellulareService
                //     .convalidaORichiediNumeroCellulare(this.datoIdentificazioneCliente.contatti.numero_di_cellulare, 'sms')
                //     .subscribe(
                //         (data: any) => {
                //             if (data) {
                //                 this.setError = '';
                //                 this.invalidOtp = false;
                //                 this._loader.success();
                //                 this.stepService.goToNextStep();
                //             } else {
                //                 this.invalidOtp = true;
                //                 this.setError = 'INVALID_PIN';
                //                 this.remainingAttempts--;
                //             }
                //         },
                //         (error: any) => {
                //             this._loader.success();
                // this.router.navigateByUrl(`${this.router.url}/error-critic`);
                //             console.error("Errore durante l'invio dei file utente", error);
                //         }
                //     );
                this._loader.success();
            } else {
                this.router.navigateByUrl(`${this.router.url}/error`);
            }
        }
    }

    resendCode() {
        this._loader.loading();
        this.convalidaCellulareService.convalidaORichiediNumeroCellulare(null, 'sms').subscribe(
            (data: any) => {
                if (data) {
                    this._loader.success();
                }
            },
            (error: any) => {
                this._loader.success();
                this.router.navigateByUrl(`${this.router.url}/error-critic`);
                console.error("Errore durante l'invio dei file utente", error);
            }
        );
    }
}
