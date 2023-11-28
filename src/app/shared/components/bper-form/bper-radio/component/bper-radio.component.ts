import {
    OnInit,
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    SimpleChanges,
    OnChanges,
    ChangeDetectionStrategy,
    Injector
} from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, UntypedFormControl, Validators, ValidationErrors, ControlValueAccessor, ControlContainer, FormGroupDirective, NgControl, FormControlName, FormControlDirective } from '@angular/forms';

import { Radio } from '../Radio';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperRadioComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperRadioComponent),
    multi: true
};

// export type BperRadioSkin = 'dlImpreseWeb';

@Component({
    selector: 'bper-radio',
    templateUrl: './bper-radio.component.html',
    styleUrls: ['./bper-radio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class BperRadioComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() items: Radio[];
    @Input() labelPosition?: string;
    @Input() groupName: string;
    @Input() idName: number;
    @Input() required: boolean = false;
    @Input() selected: MatRadioButton;
    @Input() disable: boolean = false;
    @Input() vertical: boolean = false;
    @Input() formControlName?: string;
    // @Input() skin?: BperRadioSkin;
    @Input() type: 'large';
    @Input() sizeLabel: string;

    // Gap between items
    @Input() columnGap: string = '20px';
    @Input() rowGap: string = '5px';

    @Output() change: EventEmitter<MatRadioChange> = new EventEmitter();

    itemName: string;
    control: UntypedFormControl;
  
    currentValue: any = null;

    constructor(private injector: Injector) { }

    ngOnInit() {
        this.control = new UntypedFormControl({ value: null, disabled: this.disable });
        const ngControl = this.injector.get(NgControl)
        if (ngControl instanceof FormControlName) {
            this.control = this.injector.get(FormGroupDirective).getControl(ngControl)
        } else {
            this.control = (ngControl as FormControlDirective).form as UntypedFormControl
        }
        this.required && this.control.setValidators(Validators.required);

        this.items.forEach(item => {
            item.checked = item.value === this.control.value;
        });
    }

    onRadioChange(e: MatRadioChange) {
        this.change.emit(e);
        this.currentValue = e.value;
        if (!!e) {
            this.items.forEach(item => {
                item.checked = item.value === e.value;
            });
        }
    }

    propagateChange = (_: any) => { };

    saveData(v) {
        this.propagateChange(v);
    }

    writeValue(val: any) {
        if (this.control && this.control.value != val) this.control.setValue(val);
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) { }

    validate(control: UntypedFormControl): ValidationErrors {
        if (!control.valid) {
            return { ...control.errors, valid: false };
        }
        return null;
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add '${implements OnChanges}' to the class.
        if (changes && changes.disable && this.control) {
            changes.disable.currentValue && this.control.disable();
            !changes.disable.currentValue && this.control.enable();
            // this.ref.markForCheck();
        }
        if (changes && changes.required && this.control) {
            changes.required.currentValue && this.control.setValidators(Validators.required);
            !changes.required.currentValue && this.control.clearValidators();
            this.control.updateValueAndValidity();
            // this.ref.markForCheck();
        }
    }
}
