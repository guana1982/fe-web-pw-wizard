import { Component, Input } from '@angular/core';
import { BankInitService } from '@core/services/bank-init/bank-init.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MainLink } from './header.model';
import { FEATURE_MAPPING } from './header.constants';
import { Router } from '@angular/router';
import { externalUrlsPW } from 'src/environments/endpoint/api-pw/external-pw/urls.develop';

@Component({
    selector: 'ark-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() showCTA: boolean = false;
    link: MainLink;

    constructor(private _bankInitService: BankInitService) {}

    ngOnInit() {
        const featureName = 'ALT-SUPPORT';

        this.link = {
            /*label: item.title,
            icon: FEATURE_MAPPING[featureName]?.icon || '24px-help',
            url: FEATURE_MAPPING[featureName]?.url,
            featureReference: featureName,
            order: item.order,
            canNavigate: item.active,
            description: item.description,
            visible: item.visible*/

            label: 'Serve aiuto?',
            icon: FEATURE_MAPPING[featureName]?.icon || '24px-help',
            url: 'url',
            featureReference: 'featureName',
            order: 1,
            canNavigate: true,
            description: 'description',
            visible: true
        };
    }

    openAiuto() {
        window.open(externalUrlsPW.AIUTO_CESARE_PONTI_URL);
    }

    get isExpanded(): boolean {
        // return this._headerService.isExpanded;
        return true;
    }

    get logoSource() {
        console.log('XXX_0 ');
        return this._bankInitService.bank$.pipe(
            map(abi => {
                console.log('XXX_1: ' + JSON.stringify(abi));
                return abi == environment.BDSAbi
                    ? 'assets/bper-svg/Logo-BancodiSardegna.svg'
                    : abi == environment.BCPAbi
                    ? 'assets/bper-svg/logo cesare ponti-colore.svg'
                    : 'assets/bper-svg/bper-logo-riduzione-dark.svg';
            })
        );
    }
}
