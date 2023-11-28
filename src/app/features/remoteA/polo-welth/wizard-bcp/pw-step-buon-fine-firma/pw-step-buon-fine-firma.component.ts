import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StepService } from '../../services/step.services';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { Router } from '@angular/router';
import { externalUrlsPW } from 'src/environments/endpoint/api-pw/external-pw/urls.prod';
import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'pw-step-buon-fine-firma-component',
    templateUrl: './pw-step-buon-fine-firma.component.html',
    styleUrls: ['./pw-step-buon-fine-firma.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PwStepBuonFineFirmaComponent implements OnInit {
    constructor(
        private stepService: StepService,
        private _loader: LoaderService,
        private router: Router,
        private userDataService: UserDataService
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    ngOnInit(): void {
        setTimeout(() => {
            this._loader.success();
        }, 100);
    }

    goToNextStep(): void {
        // TODO: Cambiato per modifica wizard
        // this.stepService.goToNextStep();
        // this.stepService.setCurrentStepIndex(12);
        // TODO: Fare il logout e utilizzare il metodo della libreria del bper
        if (!this.userDataService.isPhoneBanking) {
            window.open(externalUrlsPW.BANCO_CESARE_PONTI_URL);
        } else {
            window.location.href = 'bpermobileapp://wizardPWCompleted';
        }
    }
}
