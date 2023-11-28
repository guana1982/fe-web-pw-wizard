import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepService } from '../../services/step.services';
import { FormControl, Validators } from '@angular/forms';
import { PrimoAccessoCredenzialiService } from './service/primo-accesso-credenziali.service';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { Router } from '@angular/router';

@Component({
    selector: 'pw-step-primo-accesso-credenziali',
    templateUrl: './pw-step-primo-accesso-credenziali.component.html',
    styleUrls: ['./pw-step-primo-accesso-credenziali.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PrimoAccessoCredenzialiService]
})
export class PwStepPrimoAccessoComponent implements OnInit {
    codiceUtenteControl: FormControl;
    passwordTemporaneaControl: FormControl;
    userData: any = {};
    @Output() codUtente: any = new EventEmitter<any>();

    constructor(
        private stepService: StepService,
        private primoAccessoCredenzialiService: PrimoAccessoCredenzialiService,
        private cdr: ChangeDetectorRef,
        private _loader: LoaderService,
        private router: Router
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        this.codiceUtenteControl = new FormControl('', Validators.required);
        this.passwordTemporaneaControl = new FormControl('', Validators.required);
    }

    ngOnInit(): void {
        // TODO: SCOMMENTARE
        // this.primoAccessoCredenzialiService.codPwdTemp(null).subscribe(
        //     () => {
        //         this._loader.success();
        //         this.stepService.goToNextStep();
        //     },
        //     (error: any) => {
        //         this._loader.success();
        //         this.router.navigateByUrl(`${this.router.url}/error-critic`);
        //         console.error('Errore', error);
        //     }
        // );
    }

    goToNextStep(): void {
        this._loader.loading();
        this.userData.codiceUtenteControl = this.codiceUtenteControl.value;
        this.userData.passwordTemporaneaControl = this.passwordTemporaneaControl.value;

        this.codUtente.emit(this.userData.codiceUtenteControl);
        this.stepService.goToNextStep();
        this._loader.success();

        //TODO: SCOMMENTARE la verifica delle credenziali del codice utente e password
        // this.primoAccessoCredenzialiService.ctaCodPwdTemp(this.userData.codiceUtenteControl, this.userData.passwordTemporaneaControl).subscribe(
        //     (data: any) => {
        //         if (data) {
        //             console.log('I valori inseriti coincidono');
        //             this.codUtente.emit(this.userData.codiceUtenteControl);
        //             this.stepService.goToNextStep();
        //             this.cdr.detectChanges();
        //             this._loader.success();
        //         }
        //     },
        //     (error: any) => {
        //         this._loader.success();
        //         this.router.navigateByUrl(`${this.router.url}/error-critic`);
        //         console.error('Errore durante il recupero dei file utente', error);
        //     }
        // );
    }

    resendCod(value: any) {
        this.primoAccessoCredenzialiService.codPwdTemp(value).subscribe(
            () => {
                this._loader.success();
                this.stepService.goToNextStep();
            },
            (error: any) => {
                this._loader.success();
                this.router.navigateByUrl(`${this.router.url}/error-critic`);
                console.error('Errore', error);
            }
        );
    }
}
