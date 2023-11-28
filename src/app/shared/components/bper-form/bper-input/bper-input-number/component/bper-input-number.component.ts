import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef,
    forwardRef,
    ViewChild,
    ElementRef,
    Renderer2,
    ChangeDetectionStrategy,
    Injector
} from '@angular/core';
import {
    UntypedFormControl,
    Validators,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    ValidationErrors,
    ControlValueAccessor,
    FormGroupDirective,
    ControlContainer,
    FormControlDirective,
    FormControlName,
    NgControl
} from '@angular/forms';
import { cloneDeep } from 'lodash-es';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { configComponent } from '@shared/components/components-configurations';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperInputNumberComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperInputNumberComponent),
    multi: true
};

type floatLabelType = 'always' | 'never';

@Component({
    selector: 'bper-input-number',
    templateUrl: './bper-input-number.component.html',
    styleUrls: ['./bper-input-number.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperInputNumberComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    @Input() id: string;
    @Input() name: string;
    @Input() label: string;
    @Input() floatLabel: floatLabelType = 'always';
    @Input() disable: boolean = false;
    @Input() required: boolean = false;
    @Output() value: EventEmitter<any> = new EventEmitter();
    @Input() placeholder: string = 'text';
    @Input() msgCustom: string;
    @Input() msgHint: string = '';
    @Input() min?: number;
    @Input() msgErrorMin?: string;
    @Input() max?: number;
    @Input() msgErrorMax?: string;
    @Input() minLength?: number;
    @Input() msgMinLength?: string = 'Il numero di caratteri inseriti è inferiore al minimo richiesto';
    @Input() msgMaxLength?: string = 'Il numero di caratteri inseriti è superiore al massimo consentito';
    @Input() maxLength?: number;
    @Input() step?: number;
    @Input() appearance: MatFormFieldAppearance = 'legacy';
    @Input() formControlName?: string;
    @ViewChild('inputNumber') inputNumber: ElementRef;

    @Input() iconStep?: number = 1; // Può differire dallo step - Indica l'incremento o il decremento al tap dell'icona
    @Input() leftIcon?: string;
    @Input() rightIcon?: string;

    control: UntypedFormControl;
    disabled: boolean;
    currentValue: any = null;
    errorIcon: string = configComponent.matErrorIcon;

    constructor(private ref: ChangeDetectorRef, private renderer: Renderer2, private injector: Injector) {}

    ngOnInit() {
        this.control = new UntypedFormControl(
            { value: null, disabled: this.disable },
            {
                // updateOn: 'change'
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

    validateInput(event) {
        let v = event.target.value
        this.currentValue = cloneDeep(v);
        if (v === '' || !v) {
            this.control.setValue(v, { emitEvent: false });
            if (this.required) {
                this.control.setErrors({ required: true });
            }
            return;
        }

        this.control.setValue(Number(v)); // Propaga il valore cambiato al padre, così da trasmettere eventuali validazioni ko

        // tslint:disable-next-line:max-line-length
        (String(Number(v)).match('^[+-]?(([.,]\\d+)|(\\d+([.,]\\d+)?))$') &&
            (this.control.setValue(Number(v), { emitEvent: false }), true)) ||
            (this.inputNumber.nativeElement.value = v);
        !v || (!String(v).length && this.control.setValue(v, { emitEvent: false }));

        !!this.min && Number(v) < this.min && this.control.setErrors({ min: true });
        !!this.max && Number(v) > this.max && this.control.setErrors({ max: true });
        !!this.minLength && v.length < this.minLength && this.control.setErrors({ minlength: true });
        !!this.maxLength && v.length > this.maxLength && this.control.setErrors({ maxlength: true });

        if (!!this.step && v % this.step !== 0) {
            this.control.setErrors({ valueForbidden: true });
        }
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

    ngOnDestroy() {
       
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

    onTouched = (_: any) => {};

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    validate(control: UntypedFormControl): ValidationErrors {
        if (!control.valid) {
            return { ...control.errors, valid: false };
        }
        return null;
    }

    public get floatLabelNever(): boolean {
        return this.floatLabel === 'never';
    }

    increase(): void {
        const newValue = this.roundToStep(Number(this.currentValue) + Number(this.iconStep));
        // Il .toString() è inserito poiché senza, in caso di valore 0, il campo viene percepito come vuoto.
        this.control?.patchValue(((this.max || this.max === 0) ? Math.min(this.max, newValue) : newValue).toString());
    }

    decrease(): void {
        const newValue = this.roundToStep(Number(this.currentValue) - Number(this.iconStep));
        // Il .toString() è inserito poiché senza, in caso di valore 0, il campo viene percepito come vuoto.
        this.control?.patchValue(((this.min || this.min === 0) ? Math.max(this.min, newValue) : newValue).toString());
    }

    roundToStep(value: number) {
        return Math.trunc(value / this.iconStep) * this.iconStep;
    }
}
