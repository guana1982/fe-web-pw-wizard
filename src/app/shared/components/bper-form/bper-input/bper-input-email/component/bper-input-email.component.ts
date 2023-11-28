import { UntypedFormControl, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, ControlValueAccessor, FormGroupDirective, ControlContainer, FormControlName, NgControl, FormControlDirective } from '@angular/forms';
import {
    OnInit,
    Component,
    Input,
    ViewChild,
    ElementRef,
    forwardRef,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Injector,
    AfterViewInit
} from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ArkValidators } from '@shared/validations/ark-validators';
import { configComponent } from '@shared/components/components-configurations';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperInputEmailComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperInputEmailComponent),
    multi: true
};

type floatLabelType = 'always' | 'never';

@Component({
    selector: 'bper-input-email',
    templateUrl: './bper-input-email.component.html',
    styleUrls: ['./bper-input-email.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperInputEmailComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, OnChanges {
    @Input() id: string;
    @Input() name: string;
    @Input() floatLabel: floatLabelType = 'always';
    @Input() hideError: boolean = false;
    @Input() label: string;
    @Input() required: boolean = false;
    @Input() disable: boolean = false;
    @Input() placeholder: string = 'Email';
    @Input() appearance: MatFormFieldAppearance = 'legacy';
    @Input() formControlName?: string;
    @Input() maskCobrowse: boolean = false;

    @ViewChild('inputEmail') inputEmail: ElementRef;
    control: UntypedFormControl;
    controlSubscription: any;
    currentValue: any = null;
    errorIcon: string = configComponent.matErrorIcon;

    constructor(private ref: ChangeDetectorRef, private injector: Injector) {}

    ngAfterViewInit(): void {
        if ( this.maskCobrowse ) {
            this.inputEmail?.nativeElement?.setAttribute('data-cobrowse-masked', 'true')
        }
    }

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
        
        this.required && this.control.setValidators(Validators.required);
        this.control.setValidators([Validators.email, ArkValidators.emailPattern]);
       
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add '${implements OnChanges}' to the class.
        if (changes && changes.disable && this.control) {
            changes.disable.currentValue && this.control.disable();
            !changes.disable.currentValue && this.control.enable();
        }
        if (changes && changes.required && this.control) {
            changes.required.currentValue && this.control.setValidators(Validators.required);
            !changes.required.currentValue && this.control.clearValidators();
            this.control.updateValueAndValidity();
            // this.ref.markForCheck();
        }
    }

    getErrorMessages() {
        return this.control.hasError('required') || this.control.hasError('email') || this.control.hasError('pattern')
            ? 'È necessario inserire una mail valida'
            : '';
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

    ngOnDestroy() {
        this.controlSubscription && this.controlSubscription.unsubscribe();
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled && this.control.enabled && this.control.disable({ emitEvent: false });
        !isDisabled && this.control.disabled && this.control.enable({ emitEvent: false });
    }

    public get floatLabelNever(): boolean {
        return this.floatLabel === 'never';
    }
}
