import { ChangeDetectionStrategy, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { BperStepsComponent } from '@shared/components/bper-steps/bper-steps.component';
import { forkJoin } from 'rxjs';
import { StepService } from './services/step.services';
import { UserDataService } from './services/user-data.service';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { Router } from '@angular/router';

@Component({
    selector: 'polo-welth',
    templateUrl: './polo-welth.component.html',
    styleUrls: ['./polo-welth.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoloWelthComponent implements OnInit {
    @ViewChild('r_pwStepper') stepsComponent: BperStepsComponent;
    protected currentStep: number;
    datoProfilazioneCliente: any;
    allDataIdentifyUtente: any;
    allCommunicationService: any;
    codiceUtente: any;

    constructor(
        private stepService: StepService,
        private userDataService: UserDataService,
        private cdr: ChangeDetectorRef,
        public loaderService: LoaderService,
        private router: Router
    ) {}

    ngOnInit(): void {
        forkJoin([
            this.userDataService.getStatusWizard(),
            this.userDataService.getIdentifyUtente(),
            this.userDataService.getCommunicationService(),
            this.userDataService.getErrorDashboard()
        ]).subscribe(
            ([statusWizardData, identifyUtenteData, communicationService, errorDashboard]) => {
                this.loaderService.success();
                if (statusWizardData.statusWizard) {
                    this.stepService.setCurrentStepIndex(25);
                } else {
                    this.stepService.setCurrentStepIndex(0);
                }

                if (communicationService.status) {
                    this.userDataService.statusCommunicationService = true;
                    this.userDataService.communicationService = '';
                    this.userDataService.communicationService = communicationService.title;
                } else {
                    this.userDataService.statusCommunicationService = false;
                    this.userDataService.communicationService = '';
                }

                if (errorDashboard.status) {
                    this.router.navigateByUrl(`${this.router.url}/error-dashboard`);
                }

                this.allDataIdentifyUtente = identifyUtenteData;
                this.cdr.detectChanges();
            },
            (error: any) => {
                this.router.navigateByUrl(`${this.router.url}/error-critic`);
                console.error('Errore durante il recupero dei dati utente e status Wizard', error);
            }
        );
    }

    setCodiceUtente(codUtente: string) {
        this.codiceUtente = codUtente;
    }

    dataProfilazioneCliente(dato: any) {
        this.datoProfilazioneCliente = dato;
    }

    get currentStepIndex(): number {
        return this.stepService.getCurrentStepIndex();
    }
}
