import { Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'bper-qrcode',
  templateUrl: './bper-qrcode.component.html',
  styleUrls: ['./bper-qrcode.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BperQRCodeComponent{
  @Input() encriptedData: string;
  constructor() { }
}
