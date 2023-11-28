import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { CobrowsingService } from '@shared/services/cobrowsing/cobrowsing.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'cobrowsing-modal',
    templateUrl: './modal-cobrowsing.component.html',
    styleUrls: ['./modal-cobrowsing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CobrowsingService]
})
export class ModalCobrowsingComponent implements OnInit {
    public descriptionHTML;
    public src: any;
    public cobrowsingConfig: any;
    iframeSrc;
    constructor(
        public dialogRef: MatDialogRef<ModalCobrowsingComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public cobrowsingService: CobrowsingService
    ) {}

    ngOnInit() {
        this.cobrowsingService.initCobrowsing();
        this.cobrowsingConfig = this.cobrowsingService.createCobrowseConfig();
        this.iframeSrc =
            'https://apps.mypurecloud.de/webchat/security-key-prompt/#?locale=it&amp;webchatAppUrl=' +
            this.cobrowsingConfig.webchatAppUrl +
            '&amp;webchatServiceUrl=https://realtime.mypurecloud.de:443&amp;logLevel=DEBUG&amp;orgId=1234&amp;orgGuid=' +
            this.cobrowsingConfig.orgGuid +
            '&amp;orgName=' +
            this.cobrowsingConfig.orgName +
            '&amp;cssClass=' +
            this.cobrowsingConfig.cssClass +
            '&amp;css.width=' +
            encodeURIComponent(this.cobrowsingConfig.css.width) +
            '&amp;css.height=' +
            encodeURIComponent(this.cobrowsingConfig.css.height) +
            '&amp;contentCssUrl=' +
            this.cobrowsingConfig.contentCssUrl;

        this.iframeSrc = encodeURIComponent(this.iframeSrc);
    }

    public closeModal() {
        this.dialogRef.close();
    }
}
