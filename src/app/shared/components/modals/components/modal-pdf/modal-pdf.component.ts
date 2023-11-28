import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {TealiumUtagService} from "@core/services/tealium-utag/tealium-utag.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { BehaviorSubject } from 'rxjs';
//import { DownloadResourcesService } from '@shared-ofm/services/download.service';

@Component({
    selector: 'modal-pdf',
    templateUrl: './modal-pdf.component.html',
    styleUrls: ['./modal-pdf.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalPdfComponent implements OnInit {
    modalTitle: string;

    filename: string;
    url: string;

    hidePrimaryBtn: boolean;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    loadingCounter = 0;
    public error$ = new BehaviorSubject(null);
    constructor(
        //private _downloadResourcesService: DownloadResourcesService,
        private _dialogRef: MatDialogRef<ModalPdfComponent>,
        private _tealium: TealiumUtagService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.modalTitle = this.data.modalTitle;

        this.filename = this.data.filename;
        this.url = this.data.url;

        this.hidePrimaryBtn = this.data.hidePrimaryBtn || false;
        this.primaryCtaLabel = this.data.primaryCtaLabel ?? 'Ok, ho preso visione';
        this.secondaryCtaLabel = this.data.secondaryCtaLabel ?? 'Scarica';
        console.log(this.url)
    }

    onDownloadPdf() {
        this._tealium.link({
            event_action: 'click',
            event_category: 'download',
            event_label: 'pdf-' + this.filename
        });

        //this._downloadResourcesService.downloadResources(this.filename, this.url, 'URL');
    }

    onConfirm() {
        this._dialogRef.close(true);
    }
    progressLoad(evn) {
        const total = evn.total
        const loaded = evn.loaded
        this.loadingCounter = (loaded / total * 100)
    }
    showError(err) {
        this.loadingCounter = 100;
        this.error$.next(err)
    }
}
