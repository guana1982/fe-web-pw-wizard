import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalScopriDiPiùComponent } from '../../pw-step-profilazione-cliente/modal-scopri-di-più/modal-scopri-di-più.component';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { DocPrecontrattualeService } from '../service/generic/doc-precontrattuale.service';
import { Router } from '@angular/router';

@Component({
    selector: 'modal-view-doc.component',
    templateUrl: './modal-view-doc.component.html',
    styleUrls: ['./modal-view-doc.component.scss'],
    providers: [DocPrecontrattualeService]
})
export class ModalViewDocComponent implements OnInit {
    src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'; //TODO: cambiare link
    dataFile: any;

    constructor(
        public dialogRef: MatDialogRef<ModalScopriDiPiùComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _loader: LoaderService,
        private docPrecontrattualeService: DocPrecontrattualeService,
        private router: Router
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    ngOnInit(): void {
        // Chiamata GET che viene triggherata al click del file prendendo in Input l'ID DOC
        this.docPrecontrattualeService.receiveDocumentFile(this.data.doc.id).subscribe(
            (data: any) => {
                console.log('data doc-precontrattuale: ', data);
                // this.cdr.detectChanges();
                this.dataFile = data;
                this._loader.success();
            },
            (error: any) => {
                this._loader.success();
                this.router.navigateByUrl(`${this.router.url}/error-critic`);
                console.error('Errore durante il recupero dei file utente', error);
            }
        );
    }
}
