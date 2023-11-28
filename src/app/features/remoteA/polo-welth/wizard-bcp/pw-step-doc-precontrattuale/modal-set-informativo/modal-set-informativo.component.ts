import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagaPoiButtonEvent, PagaPoiEsitoData } from '../models/generics/paga-poi-component.model';
import { CMSSupportService } from '../service/generic/cms-support.service';
import { CMSId } from '../models/generics/cms.model';
import { catchError, tap } from 'rxjs/operators';
import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';
import { DocPrecontrattualeService } from '../service/generic/doc-precontrattuale.service';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { throwError } from 'rxjs';

@Component({
    selector: 'modal-set-informativo.component',
    templateUrl: './modal-set-informativo.component.html',
    styleUrls: ['./modal-set-informativo.component.scss'],
    providers: [DocPrecontrattualeService]
})
export class ModalSetInformativoComponent {
    configuration: PagaPoiEsitoData;
    PagaPoiButtonEvent = PagaPoiButtonEvent;

    constructor(
        public dialogRef: MatDialogRef<ModalSetInformativoComponent>,
        private docPrecontrattualeService: DocPrecontrattualeService,
        private _loader: LoaderService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    sendMail(event: string) {
        // console.log('MODAL ser Info  - event sendMail' + JSON.stringify(event));
        this.configuration = this.data;
        // console.log('MODAL ser Info  - sentMail-configuration ' + JSON.stringify(this.configuration));
        this.dialogRef.close(PagaPoiButtonEvent.SECONDARY_ACTION);
    }

    download(event: string) {
        // console.log('MODAL ser Info  - event download' + JSON.stringify(event));
        this.configuration = this.data;
        // console.log('MODAL ser Info  - event download-configuration ' + JSON.stringify(this.configuration));
        this.dialogRef.close(PagaPoiButtonEvent.PRIMARY_ACTION);
    }
}
