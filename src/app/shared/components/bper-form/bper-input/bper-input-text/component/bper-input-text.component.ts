import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef,
    Injector, Input, OnChanges,
    OnDestroy, OnInit, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, UntypedFormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { configComponent } from '@shared/components/components-configurations';
import { ArkValidators } from '@shared/validations/ark-validators';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperInputTextComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperInputTextComponent),
    multi: true
};

type floatLabelType = 'always' | 'never';
type dimensionType = 'large' | 'extra-large' | 'extra-small';

@Component({
    selector: 'bper-input-text',
    templateUrl: './bper-input-text.component.html',
    styleUrls: ['./bper-input-text.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperInputTextComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() inputId: string;
    @Input() name: string;
    @Input() disable: boolean = false;
    @Input() required: boolean = false;
    @Input() floatLabel: floatLabelType = 'always';
    @Input() msgHint: string = '';
    @Input() label: string;
    @Input() placeholder: string = 'Testo';
    @Input() allowSpecialChar?: boolean = true;
    @Input() minLength?: number = 0;
    @Input() maxLength?: number = 10000;
    @Input() msgMinLength?: string = 'Il numero di caratteri inseriti è inferiore al minimo richiesto';
    @Input() msgMaxLength?: string = 'Il numero di caratteri inseriti è superiore al massimo consentito';
    @Input() appearance: MatFormFieldAppearance = 'fill';
    @Input() iconLeft: string = '';
    @Input() iconRight: string = '';
    @Input() iconDoubleRight: string = '';
    @Input() dimension: dimensionType = 'large';
    @Input() preventSpaces: boolean;
    @Input() readOnly: boolean = false;
    @Input() formControlName?: string;
    @Input() inputmode: string = 'text';
    @Input() maskCobrowse: boolean = false;
    @Input() backgroundColor: string;

    @Input() pattern: string;

    @Output() blur: EventEmitter<null> = new EventEmitter();
    @Output() value: EventEmitter<any> = new EventEmitter();

    @ViewChild('inputText') inputText: ElementRef;

    control: UntypedFormControl;

    currentValue: any = null;

    errorIcon: string = configComponent.matErrorIcon;

    constructor(private ref: ChangeDetectorRef, private injector: Injector) { }

    ngAfterViewInit(): void {
        if (this.maskCobrowse) {
            this.inputText?.nativeElement?.setAttribute('data-cobrowse-masked', 'true')
        }
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
        const validators = [];
        this.required && validators.push(Validators.required);
        this.minLength && validators.push(Validators.minLength(this.minLength));
        this.maxLength && validators.push(Validators.maxLength(this.maxLength));
        !this.allowSpecialChar && validators.push(ArkValidators.noSpecialChar);
        this.disable ? this.control.disable() : this.control.enable()

        this.control.setValidators(validators);

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
        }
    }
    validateInput(event) {
        let v = event.target.value
        this.currentValue = v
    }

    preventSpacesFn(event) {
        event.keyCode != 32 ? event : event.preventDefault();
    }

    saveData(v) {
        this.propagateChange(v);
    }

    writeValue(val: any) {
        if (this.control && this.control.value != val) this.control.setValue(val);
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled && this.control.enabled && this.control.disable({ emitEvent: false });
        !isDisabled && this.control.disabled && this.control.enable({ emitEvent: false });
    }

    registerOnTouched(fn: any) { }

    validate(control: UntypedFormControl): ValidationErrors {
        if (!control.valid) {
            return { ...control.errors, valid: false };
        }
        return null;
    }

    ngOnDestroy() {
        this.control.setErrors(null);
        this.control.setValidators(null);
    }

    public get showLeftIcon(): boolean {
        return !!this.iconLeft;
    }

    public get showRightIcon(): boolean {
        return !!this.iconRight;
    }

    public get showDoubleRightIcon(): boolean {
        return !!this.iconDoubleRight;
    }

    public get floatLabelNever(): boolean {
        return this.floatLabel === 'never';
    }

    onBlur(inputText: HTMLInputElement) {
        this.control.patchValue(inputText.value);
        this.blur.emit();
    }
}
