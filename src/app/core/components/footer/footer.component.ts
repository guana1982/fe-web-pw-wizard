import { Component, OnInit } from '@angular/core';
import { CmsDataService } from '@core/services/cms-data/cms-data.service';
import { UserDataService } from '@bper/npm-core/user-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'ark-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    public footerLinks = [];
    footerLinks$: Observable<{ title: string; label: string; url: string; }[]>;
    piva$: Observable<string> = this._cms.getBusinessInfo('piva');
    constructor(private _userDataService: UserDataService, private _cms: CmsDataService) {}

    ngOnInit(): void {
        //Al momento va in errore il servizio 
        
        this.footerLinks$ = this._userDataService.userData$.pipe(
            map(bank => {
                return this._setFooterLinks(bank.abi);
            })
        );
        
    }

    private _setFooterLinks(abi) {
        return [
            {
                title: 'privacy',
                label: 'Privacy',
                url: this.getPrivacyUrl(abi)
            },
            {
                title: 'responsabilita-amministrativa',
                label: 'D.Lgs. 231/01',
                url: this.getResponsabilitaAmministrativaUrl(abi)
            },
            {
                title: 'trasparenza',
                label: 'Trasparenza',
                url: this.getTrasparenzaUrl(abi)
            },
            {
                title: 'note-legali',
                label: 'Note legali',
                url: this.getNoteLegaliUrl(abi)
            },
            {
                title: 'antiriciclaggio',
                label: 'AML',
                url: this.getAntiriciclaggioUrl(abi)
            },
            {
                title: 'cookie-policy',
                label: 'Cookie policy',
                url: this.getCookiePolicy(abi)
            },
            {
                title: 'preferenze-cookie',
                label: 'Preferenze cookie',
                url: this.getCookiePolicy(abi)
            }
        ];
    }

    isBds(abi) {
        return abi === environment.BDSAbi;
    }

    isCesarePonti(abi) {
        return abi === environment.BCPAbi;
    }

    private getPrivacyUrl(abi) {
        const url = this.isBds(abi)
            ? 'https://www.bancosardegna.it/privacy-policy/internet-banking'
            : this.isCesarePonti(abi)
            ? 'https://bancacesareponti.it/footer/privacy-policy'
            : 'https://www.bper.it/footer/privacy-policy/internet-banking';

        return url;
    }

    private getCookiePolicy(abi) {
        const url = this.isBds(abi)
            ? 'https://www.bancosardegna.it/footer/privacy-policy/gestione-cookies/internet-banking'
            : this.isCesarePonti(abi)
            ? 'https://bancacesareponti.it/footer/privacy-policy/gestione-cookies'
            : 'https://www.bper.it/footer/privacy-policy/gestione-cookies/internet-banking';

        return url;
    }

    private getResponsabilitaAmministrativaUrl(abi) {
        const url = this.isBds(abi)
            ? 'https://www.bancosardegna.it/informative-normative/d-lgs-231-01'
            : this.isCesarePonti(abi)
            ? 'https://www.bancacesareponti.it/footer/informative-normative/dleg-231-01'
            : 'https://www.bper.it/footer/informative-normative/dleg-231-01?_ga=2.240983747.177688189.1647968555-1305436462.1632925734';

        return url;
    }

    private getTrasparenzaUrl(abi) {
        const url = this.isBds(abi)
            ? 'https://www.bancosardegna.it/trasparenza-e-fogli-informativi'
            : this.isCesarePonti(abi)
            ? 'https://bancacesareponti.it/footer/trasparenza'
            : 'https://www.bper.it/footer/trasparenza?_ga=2.198529775.177688189.1647968555-1305436462.1632925734';

        return url;
    }

    private getNoteLegaliUrl(abi) {
        const url = this.isBds(abi)
            ? 'https://www.bancosardegna.it/informative-normative/note-legali'
            : this.isCesarePonti(abi)
            ? 'https://bancacesareponti.it/footer/informative-normative/note-legali'
            : 'https://www.bper.it/footer/informative-normative/note-legali?_ga=2.198529775.177688189.1647968555-1305436462.1632925734';

        return url;
    }

    private getAntiriciclaggioUrl(abi) {
        const url = this.isBds(abi)
            ? 'https://www.bancosardegna.it/informative-normative/aml'
            : this.isCesarePonti(abi)
            ? 'https://www.bancacesareponti.it/footer/informative-normative/aml'
            : 'https://www.bper.it/footer/informative-normative/aml?_ga=2.198529775.177688189.1647968555-1305436462.1632925734';

        return url;
    }
}
