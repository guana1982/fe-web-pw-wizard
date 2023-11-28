import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'modal-accesso-negato',
    templateUrl: './modal-accesso-negato.component.html',
    styleUrls: ['./modal-accesso-negato.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAccessoNegatoComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ModalAccessoNegatoComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit(): void {}

    public goToLogin() {
        this.dialogRef.close()
        // TODO Redirect alla login
    }
}
