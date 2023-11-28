import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'modal-scopri-di-più.component',
    templateUrl: './modal-scopri-di-più.component.html',
    styleUrls: ['./modal-scopri-di-più.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalScopriDiPiùComponent {
    constructor(
        public dialogRef: MatDialogRef<ModalScopriDiPiùComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    closeModal() {
        this.dialogRef.close();
    }
}
