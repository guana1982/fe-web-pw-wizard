import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'bper-ofm-modal',
    templateUrl: './bper-ofm-modal.component.html',
    styleUrls: ['./bper-ofm-modal.component.scss']
})
export class BperOfmModalComponent implements OnInit {
    // tslint:disable-next-line: no-input-rename
    @Input('modal-title') modalTitle: string;
    @Input() id: string = '';
    @Input() noTitle: boolean = false;
    @Input() noActions: boolean = false;
    @Input() hasBorder: boolean = false;
    @Input() hasFooter: boolean = false;
    @Input() notClosable: boolean = false;

    constructor(public dialogRef: MatDialogRef<BperOfmModalComponent>) {}

    ngOnInit() {
    }

    closeModal() {
        this.dialogRef.close({ action: 'close', data: null });
        
    }

  
}
