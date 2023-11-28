import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'bper-check-informativa',
    templateUrl: './bper-check-informativa.component.html',
    styleUrls: ['./bper-check-informativa.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BperCheckInformativaComponent implements OnInit, OnDestroy {
    @Input() checkStyle: 'boxed' | 'minimal' = 'boxed';
    @Input() control: UntypedFormControl;
    @Input() disabled: boolean = false;
    @Input() description: string = 'Confermo di aver preso visione';
    @Input() icon: string = '';
    @Input() linkLabel = '';
    @Input() required?: boolean = false;

    valueCheck: boolean = false;

    formControlValueSubscription: Subscription;
    @Output() linkClick = new EventEmitter<MouseEvent>();
    constructor() {}

    ngOnInit(): void {
        this.formControlValueSubscription = this.control.valueChanges.subscribe(newValue => {
            this.valueCheck = !!newValue;
        });
    }

    ngOnDestroy(): void {
        this.formControlValueSubscription.unsubscribe();
    }

    emitLinkClick(data) {
        this.linkClick.emit(data);
    }

    onCheckboxClick(e) {
        e.preventDefault();
        this.linkClick.emit(e);
    }

}
