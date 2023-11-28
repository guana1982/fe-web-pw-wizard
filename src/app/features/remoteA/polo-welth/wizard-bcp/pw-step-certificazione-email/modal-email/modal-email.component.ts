import { Component, Inject } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CertificazioneEmailService } from '../service/certificazione-email.service';
import { LoaderService } from '@bper/npm-core/utilities/loader';

@Component({
    selector: 'modal-email.component',
    templateUrl: './modal-email.component.html',
    styleUrls: ['./modal-email.component.scss'],
    providers: [CertificazioneEmailService]
})
export class ModalEmailComponent {
    emailUtente: FormControl;
    closeModal() {
        this.dialogRef.close();
    }

    constructor(
        public dialogRef: MatDialogRef<ModalEmailComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private certificazioneEmailService: CertificazioneEmailService,
        private _loader: LoaderService
    ) {
        this.emailUtente = new FormControl('');
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
        this.closeModal();
        //TODO: Scommentare il codice
        // this._loader.loading();
        // this.certificazioneEmailService.modifyEmail(this.emailUtente.value, 'mail').subscribe(
        //     (data: any) => {
        //         if (data) {
        //             this._loader.success();
        //             this.closeModal();
        //         }
        //     },
        //     (error: any) => {
        //         this._loader.success();
        //         console.error("Errore durante l'invio del codice utente", error);
        //     }
        // );
    }
}
