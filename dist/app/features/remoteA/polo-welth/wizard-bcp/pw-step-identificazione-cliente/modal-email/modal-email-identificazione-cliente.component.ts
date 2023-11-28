import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IdentificazioneClienteService } from '../service/identificazione-cliente.service';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { Router } from '@angular/router';

@Component({
    selector: 'pw-modal-email-identificazione-cliente',
    templateUrl: './modal-email-identificazione-cliente.component.html',
    styleUrls: ['./modal-email-identificazione-cliente.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [IdentificazioneClienteService]
})
export class PwStepModalEmailIdentificazioneClienteComponent {
    @Output() closedModal = new EventEmitter<boolean>();
    @Output() closeSecondModal = new EventEmitter<boolean>();

    emailUtente: FormControl;
    showSecondModal: boolean = false;
    closeModal() {
        this.closedModal.emit();
    }

    onCloseSecondModal() {
        this.closeSecondModal.emit();
    }

    constructor(
        private identificazioneClienteService: IdentificazioneClienteService,
        private _loader: LoaderService,
        private router: Router
    ) {
        this.emailUtente = new FormControl('');
    }

    stateShowSecondModal() {
        this.showSecondModal = false;
    }

    emailPatternValidator(control: any): boolean {
        const email = control.value;
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!pattern.test(email)) {
            return true;
        }
        return null;
    }

    saveEmail() {
        this._loader.loading();
        this.showSecondModal = true;
        this._loader.success();

        // TODO: Chiamata POST be-bffe-pw-wizard/user/auth/code da SCOMMENTARE
        // this.identificazioneClienteService.modifyEmail(this.emailUtente.value, 'mail').subscribe(
        //     (data: any) => {
        //         if (data) {
        //             this._loader.success();
        //             this.showSecondModal = true;
        //         } else {
        //             console.log("L'utente non è stato correttamente modificato");
        //         }
        //     },
        //     (error: any) => {
        //         this._loader.success();
        // this.router.navigateByUrl(`${this.router.url}/error-critic`);
        //         console.error('Errore', error);
        //     }
        // );
    }
}
