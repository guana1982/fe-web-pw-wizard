import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'modal-info-profilo-component',
    templateUrl: './modal-info-profilo.component.html',
    styleUrls: ['./modal-info-profilo.component.scss']
})
export class ModalInfoProfiloComponent {
    @Output() returnBack = new EventEmitter<boolean>();
    @Input() dataInformazioni: any;

    closeModal() {
        this.returnBack.emit();
    }
}
