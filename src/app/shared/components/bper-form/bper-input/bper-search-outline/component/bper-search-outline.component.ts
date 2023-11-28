import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Injector } from '@angular/core';
import { ControlContainer, UntypedFormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'bper-search-outline',
    templateUrl: './bper-search-outline.component.html',
    styleUrls: ['./bper-search-outline.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperSearchOutlineComponent implements OnInit {
    @Input() id: string;
    @Input() name: string;
    @Input() placeholder: string = 'Testo';
    @Input() disable: boolean = false;
    @Input() appearance: MatFormFieldAppearance = 'legacy';
    @Input() formControlName?: string;
    @Output() value: EventEmitter<any> = new EventEmitter();

    control: UntypedFormControl;

    constructor(private injector: Injector) {}

    ngOnInit(): void {
        this.control = new UntypedFormControl(
            { value: null, disabled: this.disable },
            {
                updateOn: 'change'
            }
        );
        const ngControl = this.injector.get(NgControl)
        if (ngControl instanceof FormControlName) {
            this.control = this.injector.get(FormGroupDirective).getControl(ngControl)
        } else {
            this.control = (ngControl as FormControlDirective).form as UntypedFormControl
        }
    }
}
