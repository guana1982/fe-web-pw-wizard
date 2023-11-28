import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'modal-credenziali-smarrite',
    templateUrl: './modal-info-sicurezza.component.html',
    styleUrls: ['./modal-info-sicurezza.component.scss']
})
export class ModalInfoSicurezzaComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ModalInfoSicurezzaComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() {
        console.log('dentro modal credenziali smarrite', this.data);
     }

    closeModal() {
        this.dialogRef.close('ciao!');
    }
}
