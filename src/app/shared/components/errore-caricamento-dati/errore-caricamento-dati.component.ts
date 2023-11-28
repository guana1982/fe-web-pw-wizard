import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'errore-caricamento-dati',
  templateUrl: './errore-caricamento-dati.component.html',
  styleUrls: ['./errore-caricamento-dati.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErroreCaricamentoDatiComponent {
  @Input() label: string;
  @Input() errorCode: string = null; 

  getLabel() {
    return this.label || 'Ops! Non è stato possibile caricare i dati';
  }
}
