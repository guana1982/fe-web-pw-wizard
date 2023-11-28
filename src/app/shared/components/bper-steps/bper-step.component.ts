import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'bper-step',
    template: '<ng-container *ngIf="isSelected"><ng-content></ng-content></ng-container>',
})
export class BperStep {
    public isSelected: boolean = false;

    @Input() hideBack: boolean = false;
    @Input() hideNext: boolean = false;
    @Input() disabled: boolean = true;
    @Input() disabledBack: boolean = false;
    @Input() name: string = '';
    @Input() subtitle: string;
    @Input() nextLabel: string = 'Avanti';
    @Input() backLabel: string = 'Indietro';
    /** Serve per flaggare lo step come asincrono */
    @Input() async: boolean = false;
    @Input() order: number = 0;
    @Input() id: number | string;
    /** integrazioni per l'async */
    @Input() onNext: () => Observable<boolean> = () => of(true);
    @Input() onBack: () => Observable<boolean> = () => of(true);

    constructor(private cd: ChangeDetectorRef) { }

    setSelection(selection) {
        this.isSelected = selection;
        this.cd.detectChanges();
    }
}
