import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { externalUrlsPW } from 'src/environments/endpoint/api-pw/external-pw/urls.develop';
import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'pw-step-thank-you-page',
    templateUrl: './pw-step-thank-you-page.component.html',
    styleUrls: ['./pw-step-thank-you-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PwStepThankYouPageComponent {
    goConcludi: boolean = false;
    constructor(
        private router: Router,
        private userDataService: UserDataService
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    goToNextStep() {
        if (!this.userDataService.isPhoneBanking) {
            window.open(externalUrlsPW.BANCO_CESARE_PONTI_URL);
        }
    }

    goDownload() {}
}
