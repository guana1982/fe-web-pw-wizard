import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IdentificazioneClienteService } from '../service/identificazione-cliente.service';
import { Router } from '@angular/router';
import { LoaderService } from '@bper/npm-core/utilities/loader';

@Component({
    selector: 'pw-convalida-email-identificazione-cliente',
    templateUrl: './convalida-email-identificazione-cliente.component.html',
    styleUrls: ['./convalida-email-identificazione-cliente.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [IdentificazioneClienteService]
})
export class PwStepConvalidaEmailIdentificazioneClienteComponent {
    @Output() closedModal = new EventEmitter<void>();
    @Input() emailValue: string;
    setError: string;
    userData: any;
    invalidOtp: boolean = false;
    remainingAttempts: number = 6;
    pinValue: any = [];
    @Output() showSecondModal = new EventEmitter<boolean>();

    constructor(
        private router: Router,
        private identificazioneClienteService: IdentificazioneClienteService,
        private _loader: LoaderService
    ) {}

    closeModal() {
        this.closedModal.emit();
    }

    openModalEmail() {
        this.showSecondModal.emit();
    }

    onPinChange(pinData: any) {
        if (pinData && pinData.pin) {
            const pinValueArray = pinData.pin.map((pinItem: any) => pinItem.digit || '').slice(0, 6);
            this.pinValue = pinValueArray.join('');
        }
    }

    goToNextStep(): void {
        this._loader.loading();
        this.closeModal();
        this.setError = '';
        this.invalidOtp = false;
        this.closedModal.emit();
        this._loader.success();

        // TODO: Da utilizzare solamente per la prova
        //   this.invalidOtp = true;
        //   this.setError = 'INVALID_PIN';
        //   this.remainingAttempts--;
        //   this._loader.success();

        //   if (this.remainingAttempts == 0) {
        //       this._loader.loading();
        //       this.router.navigateByUrl(`${this.router.url}/error`);
        //   }

        // TODO: SCOMMENTARE chiamata POST a be-bffe-pw-wizard/user/auth/code/verify con OTP e mail con return boolean
        // this._loader.loading();
        // if (this.pinValue.length == 6) {
        //     if (this.remainingAttempts !== 1) {
        //         this.identificazioneClienteService.convalidaCodiceEmail(this.pinValue, 'mail').subscribe(
        //             (data: any) => {
        //                 if (data) {
        //                     this.closeModal();
        //                     this.setError = '';
        //                     this.invalidOtp = false;
        //                     this.closedModal.emit();
        //                     this._loader.success();
        //                 } else {
        //                     this.invalidOtp = true;
        //                     this.setError = 'INVALID_PIN';
        //                     this.remainingAttempts--;
        //                     this._loader.success();
        //                 }
        //             },
        //             (error: any) => {
        //                 this._loader.success();
        //                 this.router.navigateByUrl(`${this.router.url}/error-critic`);
        //                 console.error('Errore', error);
        //             }
        //         );
        //     } else {
        //         this.router.navigateByUrl(`${this.router.url}/error`);
        //     }
        // }
    }

    resendCode() {
        // this._loader.loading();
        // this.identificazioneClienteService.modifyEmail(this.emailValue, 'mail').subscribe(
        //     (data: any) => {
        //         if (data) {
        //             this._loader.success();
        //             this.showSecondModal = true;
        //         } else {
        //             console.log("Email non inviata correttamente");
        //         }
        //     },
        //     (error: any) => {
        //         this._loader.success();
        //         this.router.navigateByUrl(`${this.router.url}/error-critic`);
        //         console.error('Errore', error);
        //     }
        // );
    }
}
