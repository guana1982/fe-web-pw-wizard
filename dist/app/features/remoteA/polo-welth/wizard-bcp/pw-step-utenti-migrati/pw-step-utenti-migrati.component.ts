import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StepService } from '../../services/step.services';
import { externalUrlsPW } from 'src/environments/endpoint/api-pw/external-pw/urls.prod';
import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'pw-step-utenti-migrati',
    templateUrl: './pw-step-utenti-migrati.component.html',
    styleUrls: ['./pw-step-utenti-migrati.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PwStepUtentiMigratiComponent {
    nomeUtente: any;
    constructor(
        private stepService: StepService,
        private userDataService: UserDataService
    ) {}

    goToNextStep() {
        //TODO: Cambiato step da 7 a 12 per modifica logica wizard
        // this.stepService.setCurrentStepIndex(12);
        // TODO: Fare il logout anche qui (da capire)
        if (!this.userDataService.isPhoneBanking) {
            window.open(externalUrlsPW.BANCO_CESARE_PONTI_URL);
        } else {
            window.location.href = 'bpermobileapp://wizardPWCompleted';
        }
    }
}
