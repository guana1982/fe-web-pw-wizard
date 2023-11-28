import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {
    ControlContainer,
    ControlValueAccessor,
    UntypedFormControl,
    FormControlDirective,
    FormControlName,
    FormGroupDirective,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl,
    ValidationErrors,
    Validators
} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {cloneDeep} from 'lodash-es';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {clampValue} from "@shared/utils/helpers/utils.helper";
import {configComponent} from '@shared/components/components-configurations';

type floatLabelType = 'always' | 'never';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperInputCurrencyComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperInputCurrencyComponent),
    multi: true
};

@Component({
    selector: 'bper-input-currency',
    templateUrl: './bper-input-currency.component.html',
    styleUrls: ['./bper-input-currency.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperInputCurrencyComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, AfterViewChecked {
    @Input() id: string;
    @Input() name: string;
    @Input() disable: boolean = false;
    @Input() required: boolean = false;
    @Input() floatLabel: floatLabelType = 'always';
    @Output() value: EventEmitter<any> = new EventEmitter();
    @Input() placeholder: string = '';
    @Input() label: string = '';
    @Input() icon: string = 'euro';
    @Input() min?: number;
    @Input() msgErrorMin?: string;
    @Input() max?: number;
    @Input() msgErrorMax?: string;
    @Input() msgHint: string = '';
    @Input() step?: number;
    @Input() appearance: MatFormFieldAppearance = 'legacy';
    @Input() formControlName?: string;

    @Input() iconStep?: number = 1; // Può differire dallo step - Indica l'incremento o il decremento al tap dell'icona
    @Input() leftIcon?: string;
    @Input() rightIcon?: string;
    @Input() currency?: string = 'EUR';

    @ViewChild('inputNumber', { static: false }) inputNumber: ElementRef;
    control: UntypedFormControl;
    disabled: boolean;
    currentValue: any = null;

    full: boolean = false;

    errorIcon: string = configComponent.matErrorIcon;

    flagNumber: boolean = false;

    constructor(private ref: ChangeDetectorRef, public currencypipe: CurrencyPipe, private renderer: Renderer2, private injector: Injector) { }
    
    ngAfterViewChecked(): void {
        if (this.control && this.control.value === '') {
            this.control && this.required && this.control.setErrors({required: true})
        }
    }
    
    ngAfterViewInit(): void {
        if (this.control && !!this.control.value && this.control.value != '') {
            let original_view = this.control.value;

            let temp = this.currencypipe.transform(Number(this.control.value), '€', '');
            temp = this.leftIcon ? temp.replace(',00', '') : temp;
            this.inputNumber.nativeElement.value = temp

            this.control.setValue(original_view, { emitEvent: false, emitViewToModelChange: true, emitModelToViewChange: false })
        }
        this.control.updateValueAndValidity();
    }

    ngOnInit(): void {
        this.control = new UntypedFormControl(
            { value: null, disabled: this.disable },
            {
                updateOn: 'blur'
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
        const { min, max, disable, required } = changes;
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add '${implements OnChanges}' to the class.
        if (disable && this.control) {
            disable.currentValue && this.control.disable({ onlySelf: true, emitEvent: false });
            !disable.currentValue && this.control.enable({ onlySelf: true, emitEvent: false });
        }
        if (required && this.control) {
            required.currentValue && this.control.setValidators(Validators.required);
            !required.currentValue && this.control.clearValidators();
        }

        // aggiunti validatori min max
        if (min && this.control) {
            min.currentValue && this.control.setValidators(Validators.min(this.min));
            !min.currentValue && this.control.clearValidators();
        }
        if (max && this.control) {
            max.currentValue && this.control.setValidators(Validators.max(this.max));
            !max.currentValue && this.control.clearValidators();
        }
       
        this.control?.updateValueAndValidity({emitEvent: false });
        this.ref.markForCheck();
    }

    validateInput(event) {
        let v = event.target.value;
        this.currentValue = cloneDeep(v);

        if (!v) {
            if (this.required) {
                this.control.setErrors({ required: true });
            }
            return;
        }

        if (!this.flagNumber) { v = v.replace(/\./g, '').replace(',', '.').replace('€', '').trim() }
        this.flagNumber = false;

        this.control.setValue(Number(v), { emitEvent: false, emitViewToModelChange: true, emitModelToViewChange: false });

        let temp = this.currencypipe.transform(Number(v), '€', this.leftIcon ? 'symbol' : '');
        this.leftIcon && (temp = temp?.replace(',00', ''));
        this.inputNumber.nativeElement.value = temp;

        !!this.min && Number(v) < this.min && this.control.setErrors({ min: true });
        !!this.max && Number(v) > this.max && this.control.setErrors({ max: true });

        if (!!this.step && v % this.step !== 0) {
            this.control.setErrors({ importoForbidden: true });
        }
    }

    saveData(v) {
        this.propagateChange(v);
    }

    writeValue(val: any) {
        if (typeof val === 'number') {
            this.flagNumber = true;

            setTimeout(() => {
                this.validateInput({target: {value: val}});
                // this.currentValue = cloneDeep(val);
                //
                // this.control.setValue(val.toString(), { emitEvent: false, emitViewToModelChange: false, emitModelToViewChange: true });
                // this.inputNumber.nativeElement.value = this.currencypipe.transform(val, '€', '');
            }, 0);
        }

        else if (this.control && this.control.value != val) {
            this.control.setValue(val, { emitEvent: false, onlySelf: true });
        }
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled && this.control.enabled && this.control.disable({ onlySelf: true, emitEvent: false });
        !isDisabled && this.control.disabled && this.control.enable({ onlySelf: true, emitEvent: false });
    }

    registerOnTouched(fn: any) { }

    validate(control: UntypedFormControl): ValidationErrors {
        if (!control.valid) {
            return { ...control.errors, valid: false };
        }
        return null;
    }

    public get floatLabelNever(): boolean {
        return this.floatLabel === 'never';
    }

    public get showIcon(): boolean {
        return !!this.icon;
    }

    increase(): void {
        const newValue = this.roundToStep(
            Number(this.control?.value?.toString() || 0) + Number(this.iconStep)
        );

        // Il .toString() è inserito poiché senza, in caso di valore 0, il campo viene percepito come vuoto.
        this.control?.setValue(
            clampValue(newValue, this.min, this.max).toString().replace('.', ',')
        );
    }

    decrease(): void {
        const newValue = this.roundToStep(
            Number(this.control?.value?.toString() || 0) - Number(this.iconStep)
        );

        // Il .toString() è inserito poiché senza, in caso di valore 0, il campo viene percepito come vuoto.
        this.control?.setValue(
            clampValue(newValue, this.min, this.max).toString().replace('.', ',')
        );
    }

    roundToStep(value: number) {
        return Math.trunc(value / this.iconStep) * this.iconStep;
    }

    onFocusIn() {
        if (this.leftIcon) {
            this.inputNumber.nativeElement.value = this.inputNumber.nativeElement.value.replace('€', '')?.trim();
        }
    }
}
