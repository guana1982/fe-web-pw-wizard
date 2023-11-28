import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Injector, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild
} from '@angular/core';
import { UntypedFormControl, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, ControlValueAccessor, FormGroupDirective, ControlContainer, FormControlName, FormControlDirective, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { configComponent } from '@shared/components/components-configurations';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperInputPasswordComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperInputPasswordComponent),
    multi: true
};

type floatLabelType = 'always' | 'never';

@Component({
    selector: 'bper-input-password',
    templateUrl: './bper-input-password.component.html',
    styleUrls: ['./bper-input-password.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperInputPasswordComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    @Input() inputId: string;
    @Input() name: string;
    @Input() label: string;
    @Input() floatLabel: floatLabelType = 'always';
    @Input() disable: boolean = false;
    @Input() required: boolean = false;
    @Input() success: boolean = false;
    @Input() failure: boolean = false;
    @Input() failureMsg: string;
    @Output() value: EventEmitter<any> = new EventEmitter();
    @Input() placeholder: string = 'text';
    @Input() minLength?: number;
    @Input() msgMinLength?: string;
    @Input() maxLength?: number;
    @Input() msgMaxLength?: string;
    @Input() appearance: MatFormFieldAppearance = 'fill';
    @Input() formControlName?: string;
    @Input() iconLeft: string = '';
    @ViewChild('inputPassword') inputPassword: ElementRef;

    control: UntypedFormControl;
    controlSubscription: any;
    disabled: boolean;
    currentValue: any = null;
    errorIcon: string = configComponent.matErrorIcon;

    constructor(private ref: ChangeDetectorRef, private renderer: Renderer2, private injector: Injector) {}

    ngOnInit(): void {
        this.control = new UntypedFormControl(
            { value: null, disabled: this.disable },
            {
                updateOn: 'change'
            }
        );

        this.required && this.control.setValidators(Validators.required);
        const ngControl = this.injector.get(NgControl)
        if (ngControl instanceof FormControlName) {
            this.control = this.injector.get(FormGroupDirective).getControl(ngControl)
        } else {
            this.control = (ngControl as FormControlDirective).form as UntypedFormControl
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add '${implements OnChanges}' to the class.
        if (changes && changes.disable && this.control) {
            changes.disable.currentValue && this.control.disable();
            !changes.disable.currentValue && this.control.enable();
            this.ref.markForCheck();
        }
        if (changes && changes.required && this.control) {
            changes.required.currentValue && this.control.setValidators(Validators.required);
            !changes.required.currentValue && this.control.clearValidators();
            this.control.updateValueAndValidity();
            this.ref.markForCheck();
        }

        if (changes && changes.failure) {
            changes.failure.currentValue &&
                this.control.setErrors({
                    notCorrect: changes.failure.currentValue
                });

            this.ref.markForCheck();
        }
    }

    ngOnDestroy() {
       
    }
    
    validateInput(event) {
        let v = event.target.value
        this.currentValue = v
    }

    saveData(v) {
        this.propagateChange(v);
    }

    writeValue(val: any) {
        if (this.control && this.control.value != val) this.control.setValue(val);
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled && this.control.enabled && this.control.disable({ emitEvent: false });
        !isDisabled && this.control.disabled && this.control.enable({ emitEvent: false });
    }

    registerOnTouched(fn: any) {}

    validate(control: UntypedFormControl): ValidationErrors {
        if (!control.valid) {
            return { ...control.errors, valid: false };
        }
        return null;
    }

    public get floatLabelNever(): boolean {
        return this.floatLabel === 'never';
    }
}
