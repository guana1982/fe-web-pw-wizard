import {
    OnInit,
    Component,
    Input,
    forwardRef,
    OnDestroy,
    EventEmitter,
    Output,
    SimpleChanges,
    OnChanges,
    ChangeDetectionStrategy,
    Injector
} from '@angular/core';
import { UntypedFormControl, Validators, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, ControlContainer, FormGroupDirective, FormControlName, NgControl, FormControlDirective } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { asapScheduler } from 'rxjs';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperCheckboxComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperCheckboxComponent),
    multi: true
};

@Component({
    selector: 'bper-checkbox',
    templateUrl: './bper-checkbox.component.html',
    styleUrls: ['./bper-checkbox.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperCheckboxComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    @Input() id: string;
    @Input() name: string;
    @Input() label: string;
    @Input() labelPosition?: string;
    @Input() checked: boolean = false;
    @Input() indeterminate?: boolean = false;
    @Input() disable: boolean = false;
    @Input() required: boolean = true;
    @Input() formControlName?: string;
    // @Input() skin?: ArkCheckboxSkin;

    @Output() change: EventEmitter<MatCheckboxChange> = new EventEmitter();

    control: UntypedFormControl;
    controlSubscription: any;
    currentValue: any = null;
    validators = [];

    isIE: boolean;

    constructor(private injector: Injector) {
        
    }

    ngOnInit() {

        // this.isIE = !!window.navigator.msSaveOrOpenBlob;

        this.control = new UntypedFormControl(

            { value: null, disabled: this.disable },

            {

                updateOn: 'change'

            }

        );



        if (this.formControlName != null) {
            const ngControl = this.injector.get(NgControl);
            if (ngControl instanceof FormControlName) {
                this.control = this.injector.get(FormGroupDirective).getControl(ngControl)
            } else {
                this.control = (ngControl as FormControlDirective).form as UntypedFormControl
            }
        } 

        this.required && this.control.setValidators(Validators.required);
        if (this.disable !== undefined && this.disable !== null) {
            this.disable && this.control.disable();
            !this.disable && this.control.enable();
        }
    }

    onCheckboxChange(e: MatCheckboxChange) {
        this.change.emit(e);
    }

    propagateChange = (_: any) => {};

    saveData(v) {
        this.propagateChange(v);
    }

    writeValue(val: any) {
        if (this.control && this.control.value != val) this.control.setValue(val);
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {}

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

        if (changes && changes.checked) {
            asapScheduler.schedule(() => this.control.setValue(changes.checked.currentValue));
        }
    }

    ngOnDestroy() {
      
    }
}
