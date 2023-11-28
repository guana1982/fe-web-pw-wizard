import {Component, ChangeDetectionStrategy, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'bper-modal-b',
  templateUrl: './bper-modal-b.component.html',
  styleUrls: ['./bper-modal-b.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperModalBComponent {
  @Input() footerDirection: 'vertical' | 'center' | 'space-between';
  @Input() hideFooter: boolean = false;
  @Input() modalTitle: string;
  @Input() noTitle: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<BperModalBComponent>,
      @Inject(MAT_DIALOG_DATA) public data
  ) {}

  public closeModal() {
    this.dialogRef.close('close');
  }
}
