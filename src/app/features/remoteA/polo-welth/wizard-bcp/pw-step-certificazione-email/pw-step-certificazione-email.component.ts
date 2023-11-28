import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { StepService } from '../../services/step.services';
import { CertificazioneEmailService } from './service/certificazione-email.service';
import { CodeEmail } from './models/certificazione-email.model';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalEmailComponent } from './modal-email/modal-email.component';
import { tap } from 'lodash-es';
import { CMSId } from '../pw-step-doc-precontrattuale/models/generics/cms.model';
import { CMSSupportService } from '../pw-step-doc-precontrattuale/service/generic/cms-support.service';
import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';
import { Router } from '@angular/router';
import { LoaderService } from '@bper/npm-core/utilities/loader';

@Component({
    selector: 'pw-step-certificazione-email-component',
    templateUrl: './pw-step-certificazione-email.component.html',
    styleUrls: ['./pw-step-certificazione-email.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CertificazioneEmailService]
})
export class PwStepCertificazioneEmailComponent {
    setError: string;
    userData: CodeEmail;
    invalidOtp: boolean = false;
    remainingAttempts: number = 6;
    pinValue: any = [];
    @Input() datoIdentificazioneCliente: any;

    constructor(
        private stepService: StepService,
        private certificazioneEmailService: CertificazioneEmailService,
        private _dialogHandler: DialogHandlerService,
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
                this._loader.success();
                this.stepService.goToNextStep();

                // Scommentare il codice
                // this.certificazioneEmailService
                //     .certificazioneMail(this.datoIdentificazioneCliente.contatti.email)
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
                //             console.error("Errore", error);
                //         }
                // );
            } else {
                this.router.navigateByUrl(`${this.router.url}/error`);
            }
        }
    }

    openModalEmail() {
        const ref = this._dialogHandler.defaultConfig().open(ModalEmailComponent);
        ref.afterClosed().subscribe(data => {
            console.log('onClose -> ', data);
        });
    }

    resendCode() {
        this.certificazioneEmailService.modifyEmail(this.datoIdentificazioneCliente.contatti.email, 'mail').subscribe(
            (data: any) => {
                if (data) {
                    this._loader.success();
                }
            },
            (error: any) => {
                this._loader.success();
                this.router.navigateByUrl(`${this.router.url}/error-critic`);
                console.error("Errore durante l'invio del codice utente", error);
            }
        );
    }
}
