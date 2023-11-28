import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'modal-informativa',
    templateUrl: './modal-informativa.component.html',
    styleUrls: ['./modal-informativa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalInformativaComponent implements OnInit {
    public type;
    public title;
    public description;
    public buttonLabel;
    /** aggiunto error code per modale di errore */
    public errorCode: string;

    public descriptionHTML;

    constructor(public dialogRef: MatDialogRef<ModalInformativaComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit(): void {
        this.type = this.data.type;
        this.title = this.data.title;
        this.description = this.data.description;
        this.buttonLabel = this.data.buttonLabel || 'Ok, ho capito';
        /** aggiunto error code per modale di errore */
        this.errorCode = this.data.errorCode;
        this.descriptionHTML = this.data.descriptionHtml
    }

    public closeModal() {
        this.dialogRef.close();
    }
}
