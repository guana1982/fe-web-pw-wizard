import {
    OnInit,
    Component,
    ViewChild,
    ElementRef,
    Input,
    forwardRef,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy,
    Injector
} from '@angular/core';
import { UntypedFormControl, Validators, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, ControlContainer, FormGroupDirective, NgControl, FormControlName, FormControlDirective } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { configComponent } from '@shared/components/components-configurations';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperInputCfpiComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperInputCfpiComponent),
    multi: true
};

type floatLabelType = 'always' | 'never';

@Component({
    selector: 'bper-input-cfpi',
    templateUrl: './bper-input-cfpi.component.html',
    styleUrls: ['./bper-input-cfpi.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperInputCfpiComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    @Input() id: string;
    @Input() name: string;
    @Input() label: string;
    @Input() isCF: boolean = true;
    @Input() isPI: boolean = true;
    @Input() minLength?: number = 9;
    @Input() maxLength?: number = 16;
    @Input() floatLabel: floatLabelType = 'always';
    @Input() disable: boolean = false;
    @Input() required: boolean = false;
    @Input() placeholder: string = 'CF/P.Iva';
    @Input() appearance: MatFormFieldAppearance = 'legacy';
    @Input() formControlName: string;
    @Input() msgHint: string;

    @ViewChild('inputCfpi') inputCfpi: ElementRef;

    errorIcon: string = configComponent.matErrorIcon;

    control: UntypedFormControl;
    currentValue: any = null;
    validators = [];
    constructor(private injector: Injector) {

    }
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

    validateInput(evn) {
        let v = evn.target.value;
        const cfPattern = new RegExp(/^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i);
        const piPattern = new RegExp('^0{0,5}[0-9]{11}');
        this.currentValue = v;

        if (
            !!v &&
            !(
                (this.isCF && cfPattern.test(v)) ||
                (this.isPI && piPattern.test(v))
            )
        ) {
            this.control.setErrors({ pattern: true });
        }
    }

    getErrorMessages() {
        return this.control.hasError('required')
            ? 'Campo obbligatorio'
            : this.control.hasError('pattern')
            ? 'Il formato non è corretto'
            : this.control.hasError('minlength')
            ? 'Lunghezza minima non valida'
            : this.control.hasError('maxlength')
            ? 'Lunghezza massima non valida'
            : this.control.hasError('generic')
            ? 'Campo non valido'
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

    ngOnDestroy() {
        this.control.setErrors(null);
        this.control.setValidators(null);
    }

    public get floatLabelNever(): boolean {
        return this.floatLabel === 'never';
    }
}
