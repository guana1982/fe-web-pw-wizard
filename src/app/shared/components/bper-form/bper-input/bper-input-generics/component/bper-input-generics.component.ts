import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NgModel, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { TealiumUtagService } from '@bper/npm-core/tealium-utag';
import { configComponent } from '@shared/components/components-configurations';
import { GenericObject } from '@shared/models/general.model';

type floatLabelType = 'always' | 'never';

@Component({
    selector: 'bper-input-generics',
    templateUrl: './bper-input-generics.component.html',
    styleUrls: ['./bper-input-generics.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: BperInputGenericsComponent,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: BperInputGenericsComponent,
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class BperInputGenericsComponent implements ControlValueAccessor, Validator, OnChanges {
    @Input() name: string;
    /** Disable the input */
    @Input() disabled: boolean = false;
    /** Define if input is required */
    @Input() required: boolean = false;
    /** Define the label to show above the input */
    @Input() label: string;
    /** Define the label to show inside the input */
    @Input() placeholder: string = '';
    /**
     *  Define the type of the input
     *     - string: input wouldn't be format
     *     - decimal: input would be format in the format '1.000,12'
     *     - integer: input would be format in the format '1.000'
     */
    @Input() type: 'string' | 'decimal' | 'integer' = 'string';
    /**
     * Define when the changes will emits
     *
     * @type {('change' | 'blur')}
     */
    @Input() updateOn: 'change' | 'blur' = 'change';
    @Input() validInput: 'alphanumeric' | 'numbers-only' | 'alphanumeric-w-spaces' | 'chars-only';

    @Input() minLength?: number = 0;
    @Input() maxLength?: number = 10000;
    @Input() msgHint: string = '';
    // @Input() msgMinLength?: string = 'Il numero di caratteri inseriti è inferiore al minimo richiesto';
    // @Input() msgMaxLength?: string = 'Il numero di caratteri inseriti è superiore al massimo consentito';

    @Input() readOnly: boolean = false;
    

    // @Output() value: EventEmitter<any> = new EventEmitter();
    @ViewChild('inputText') inputText: NgModel;

    // appearance: MatFormFieldAppearance = 'legacy';
    // floatLabel: floatLabelType = 'always';

    value: string;
    private _pristineValue: string = '';
    errors: GenericObject<string> = null;
    touched: boolean = false;

    /** Function to bind onValueChange */
    private _onChange;
    /** Function to bind on input Touched */
    private _onTouched;
    private _onValidatorChange: any;

    errorIcon: string = configComponent.matErrorIcon;

    constructor(private numberPipe: DecimalPipe, private _tealium: TealiumUtagService, private _cd: ChangeDetectorRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        const { disabled } = changes;

        if (disabled) this._onValidatorChange && this._onValidatorChange();
    }

    onFocus( event ) {
        this.markAsTouched();
        this.writeValue(this._pristineValue);
    }

    onBlur( event ) {
        this._pristineValue = event.target?.value;
        const value = this._formatValue(this._pristineValue);
        if( this.updateOn === 'blur' ){
            this._onChange(value);
        }
        this.writeValue(this._formatValue(value,true));
        this._setErrorEvent();
    }

    onInput( event ) {
        if( this.updateOn === 'change' ){
            const value = this._formatValue(event.target?.value);
            this._onChange(value);
        }
    }

    writeValue(value: any) {
        this._pristineValue = value;
        this.value = value;
        // refresh view after value update
        this._cd.markForCheck();
    }

    registerOnChange( onChange: any) { this._onChange = onChange; }
    registerOnTouched( onTouched: any) { this._onTouched = onTouched; }

    markAsTouched() {
        if (!this.touched) {
            this._onTouched();
            this.touched = true;
        }
    }

    validate(control: UntypedFormControl): ValidationErrors {
        if (this.disabled) return null;

        return null;
    }
    registerOnValidatorChange( validatorChange: any): void {
        this._onValidatorChange = validatorChange;
    }

    /**
     * Returns a string with the right format output
     * @param value             value to format
     * @param changesFromModel  if true, format value from control to view, else viceversa
     * @returns
     */
    private _formatValue(value: string | number, changesFromModel: boolean = false): string {
        if (!value) return '';

        let format: string = `${value}`;
        switch (this.type) {
            case 'decimal':
                format = changesFromModel ? this.numberPipe.transform(value, '1.0-2') : parseFloat(format.replace(/\./g, '').replace(',', '.')).toFixed(2);
                break;
            case 'integer':
                format = changesFromModel ? this.numberPipe.transform(value, '1.0-0') : format.replace(/\./g, '');
                break;
        }
        return format;
    }

    public get charsPermitted() {
        if( this.type === 'decimal' ) return 'currency';
        if( this.type === 'integer' ) return 'numberOnly';

        if( this.validInput === 'alphanumeric' ) return 'specialChar';
        if( this.validInput === 'alphanumeric-w-spaces' ) return 'alphanumericWithSpaces';
        if( this.validInput === 'numbers-only' ) return 'numberOnly';
        if( this.validInput === 'chars-only' ) return 'charsOnly';

        return null;
    }

    private _setErrorEvent() {
        const { errors } = this.inputText;
        const keys = Object.keys(errors || {});

        if( keys?.length ) {
            // TODO: Mapping label errori validazione -> ora c'è la chiave, dovrà esserci il valore
            keys.forEach( k => {
                this._tealium.link({
                    event_category: 'errore compilazione',
                    event_action: 'error',
                    event_label: k
                })
            })
        }
    }
}
