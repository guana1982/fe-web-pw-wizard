import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StepService } from '../../services/step.services';
import { aliasUtenteInterface } from './models/nuove-credenziali.model';
import { LoaderService } from '@bper/npm-core/utilities/loader';

@Component({
    selector: 'pw-step-nuove-credenziali',
    templateUrl: './pw-step-nuove-credenziali.component.html',
    styleUrls: ['./pw-step-nuove-credenziali.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PwStepNuoveCredenzialiComponent {
    passwordUtente: FormControl;
    confermaPasswordUtente: FormControl;
    @Input() aliasUtente: aliasUtenteInterface;
    @Input() codiceUtente: any;

    constructor(private stepService: StepService, private _loaderService: LoaderService, private cdr: ChangeDetectorRef) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.passwordUtente = new FormControl('', [this.validateNumericPassword.bind(this)]);
        this.confermaPasswordUtente = new FormControl('');
    }

    verificaConfermaPassword() {
        if (!!this.passwordUtente && !!this.confermaPasswordUtente) {
            if (this.passwordUtente.value == this.confermaPasswordUtente.value) {
                return true;
            } else {
                return false;
            }
        }
    }

    goToNextStep(): void {
        this.stepService.goToNextStep();
    }

    validateNumericPassword(control: FormControl) {
        const newPassword = control.value;

        if (/^[0-9]+$/.test(newPassword) && newPassword !== this.codiceUtente && newPassword.length >= 8) {
            return null; // La password è valida
        } else {
            return { invalidPassword: true };
        }
    }

    isButtonDisabled(): boolean {
        const newPassword = this.passwordUtente.value;

        return (
            !newPassword || // La password è vuota o nullo
            newPassword == this.codiceUtente ||
            !this.confermaPasswordUtente.value || // La conferma della password è vuota o nullo
            newPassword.length < 8 || // La password è inferiore a 8 caratteri
            !/^[0-9]+$/.test(newPassword) || // La password non contiene solo cifre numeriche
            newPassword !== this.confermaPasswordUtente.value // La password e la conferma della password non corrispondono
        );
    }
}
