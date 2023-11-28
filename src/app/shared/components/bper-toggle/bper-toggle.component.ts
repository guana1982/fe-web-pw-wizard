import {
    ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Injector, Input, OnChanges,
    OnDestroy, OnInit, Output, SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { asapScheduler } from 'rxjs';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperToggleComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperToggleComponent),
    multi: true
};

@Component({
    selector: 'bper-toggle',
    templateUrl: './bper-toggle.component.html',
    styleUrls: ['./bper-toggle.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperToggleComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    @Input() id?: string;
    @Input() name?: string;
    @Input() labelPosition?: string;
    @Input() toggleLabel: string;
    @Input() checked?: boolean = false;
    @Input() disable?: boolean = false;
    @Input() required?: boolean = false;

    @Output() change: EventEmitter<MatSlideToggleChange> = new EventEmitter();
    @Output() toggleChange?: EventEmitter<any> = new EventEmitter();

    control: UntypedFormControl;
    currentValue: any = null;
    validators = [];

    isIE: boolean;

    constructor(private injector: Injector) {}

    ngOnInit() {
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

        this.required && this.control.setValidators(Validators.required);

    }

    onSlideToggleChange(e: MatSlideToggleChange) {
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
