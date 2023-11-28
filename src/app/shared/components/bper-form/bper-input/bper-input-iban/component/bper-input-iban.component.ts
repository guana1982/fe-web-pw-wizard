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
    Injector,
    Output,
    EventEmitter,
} from '@angular/core';
import { UntypedFormControl, Validators, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, ControlContainer, FormGroupDirective, FormControlName, FormControlDirective, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { CmsDataService } from '@core/services/cms-data/cms-data.service';
import { CmsGenericSections } from '@core/services/cms-data/cms-sections.constants';
import { map, take } from 'rxjs/operators';
import {TealiumUtagService} from "@bper/npm-core/tealium-utag";
import {BehaviorSubject, Observable} from "rxjs";
import { configComponent } from '@shared/components/components-configurations';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperInputIbanComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperInputIbanComponent),
    multi: true
};

type floatLabelType = 'always' | 'never';

@Component({
    selector: 'bper-input-iban',
    templateUrl: './bper-input-iban.component.html',
    styleUrls: ['./bper-input-iban.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperInputIbanComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    @Input() id: string;
    @Input() name: string;
    @Input() label: string;
    @Input() floatLabel: floatLabelType = 'always';
    @Input() disable: boolean = false;
    @Input() required: boolean = false;
    @Input() minLength?: number;
    @Input() maxLength?: number;
    @Input() placeholder: string = 'IBAN';
    @Input() appearance: MatFormFieldAppearance = 'legacy';
    //
    @Input() formControlName?: string;

    @Output() isMigrationIban = new EventEmitter<boolean>();
    // TODO 
    @ViewChild('inputCfpi') inputIban: ElementRef;

    errorIcon: string = configComponent.matErrorIcon;

    control: UntypedFormControl;
    controlSubscription: any;
    currentValue: any = null;
    redIbanAbi: string[] = [];
    checkAbi: boolean = false;

    private _isRedIban: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isRedIban$: Observable<boolean> = this._isRedIban.asObservable();

    constructor(
        private injector: Injector,
        private _cms: CmsDataService,
        private _tealium: TealiumUtagService
    ) { }

    ngOnInit() {
        this.getCMSIbanMigration()
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

        this.control.setValidators(validators);
    }

    validateInput(event) {
        this.currentValue = event.target.value
        let v = this.currentValue

        const ibanCodes = ["AL", "AD", "AT", "BH", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "DO", "EE", "FI", "FR", "GE", "DE", "GI", "GR", "HU", "IS", "IE", "IL", "IT", "KZ", "KW", "LV", "LB", "LI", "LT", "LU", "MK", "MT", "MR", "MU", "MC", "ME", "NL", "NO", "PL", "PT", "RO", "SM", "SA", "RS", "SK", "SI", "ES", "SE", "CH", "TN", "TR", "AE", "GB"];
        const ibanPattern = new RegExp(
            '^AL\\d{10}[0-9A-Z]{16}$|' +
            '^AD\\d{10}[0-9A-Z]{12}$|' +
            '^AT\\d{18}$|' +
            '^BH\\d{2}[A-Z]{4}[0-9A-Z]{14}$|' +
            '^BE\\d{14}$|' +
            '^BA\\d{18}$|' +
            '^BG\\d{2}[A-Z]{4}\\d{6}[0-9A-Z]{8}$|' +
            '^HR\\d{19}$|' +
            '^CY\\d{10}[0-9A-Z]{16}$|' +
            '^CZ\\d{22}$|' +
            '^DK\\d{16}$|' +
            '^FO\\d{16}$|' +
            '^GL\\d{16}$|' +
            '^DO\\d{2}[0-9A-Z]{4}\\d{20}$|' +
            '^EE\\d{18}$|' +
            '^FI\\d{16}$|' +
            '^FR\\d{12}[0-9A-Z]{11}\\d{2}$|' +
            '^GE\\d{2}[A-Z]{2}\\d{16}$|' +
            '^DE\\d{20}$|' +
            '^GI\\d{2}[A-Z]{4}[0-9A-Z]{15}$|' +
            '^GR\\d{9}[0-9A-Z]{16}$|' +
            '^HU\\d{26}$|' +
            '^IS\\d{24}$|' +
            '^IE\\d{2}[A-Z]{4}\\d{14}$|' +
            '^IL\\d{21}$|' +
            '^IT\\d{2}[A-Z]\\d{10}[0-9A-Z]{12}$|' +
            '^[A-Z]{2}\\d{5}[0-9A-Z]{13}$|' +
            '^KW\\d{2}[A-Z]{4}22!$|' +
            '^LV\\d{2}[A-Z]{4}[0-9A-Z]{13}$|' +
            '^LB\\d{6}[0-9A-Z]{20}$|' +
            '^LI\\d{7}[0-9A-Z]{12}$|' +
            '^LT\\d{18}$|' +
            '^LU\\d{5}[0-9A-Z]{13}$|' +
            '^MK\\d{5}[0-9A-Z]{10}\\d{2}$|' +
            '^MT\\d{2}[A-Z]{4}\\d{5}[0-9A-Z]{18}$|' +
            '^MR13\\d{23}$|' +
            '^MU\\d{2}[A-Z]{4}\\d{19}[A-Z]{3}$|' +
            '^MC\\d{12}[0-9A-Z]{11}\\d{2}$|' +
            '^ME\\d{20}$|' +
            '^NL\\d{2}[A-Z]{4}\\d{10}$|' +
            '^NO\\d{13}$|' +
            '^PL\\d{26}$|' +
            '^PT\\d{23}$|' +
            '^RO\\d{2}[A-Z]{4}[0-9A-Z]{16}$|' +
            '^SM\\d{2}[A-Z]\\d{10}[0-9A-Z]{12}$|' +
            '^SA\\d{4}[0-9A-Z]{18}$|' +
            '^RS\\d{20}$|' +
            '^SK\\d{22}$|' +
            '^SI\\d{17}$|' +
            '^ES\\d{22}$|' +
            '^SE\\d{22}$|' +
            '^CH\\d{7}[0-9A-Z]{12}$|' +
            '^TN59\\d{20}$|' +
            '^TR\\d{7}[0-9A-Z]{17}$|' +
            '^AE\\d{21}$|' +
            '^GB\\d{2}[A-Z]{4}\\d{14}$',
            "i"
        );

        // Inseriti manualmente, separati solo per distinguerle dalle regex schiantate
        const manualIbanCodes = ["DO", "VA", "MQ", "MD", "UA"];
        const manualIbanPattern = new RegExp(
            '^DO\\d{2}[A-Z0-9]{4}\\d{20}$|' +
            '^VA\\d{2}\\d{3}\\d{15}$|' +
            '^MQ\\d{2}\\d{5}\\d{5}[A-Z0-9]{11}\\d{2}$|' +
            '^MD\\d{2}[0-9A-Z]{2}[0-9A-Z]{18}$|' +
            '^UA\\d{2}\\d{6}[A-Z0-9]{19}$',
            "i"
        )

        const genericPattern = new RegExp('^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$');

        const ibanRegion = v?.slice(0, 2)?.toUpperCase();
        this.control.setValue(v, {emitEvent: false});

        if (ibanCodes.includes(ibanRegion)) {
            !ibanPattern.test(v) && this.control.setErrors({pattern: true});
        } else if (manualIbanCodes.includes(ibanRegion)) {
            !manualIbanPattern.test(v) && this.control.setErrors({pattern: true});
        } else {
            !genericPattern.test(v) && this.control.setErrors({ pattern: true });
        }

        this._setIsRedIban(v);
    }

    private _setIsRedIban(v: string) {
        const ibanRegion = v?.slice(0, 2)?.toUpperCase();
        const abiPattern = v?.slice(5, 10);

        this._isRedIban?.next(this.checkAbi && this.redIbanAbi?.includes(abiPattern) && ibanRegion === 'IT');

        this._isRedIban?.getValue() && this._tealium.link({
            event_action: "verifica",
            event_category: "iban",
        });

        this.isMigrationIban.emit(this._isRedIban?.getValue());
    }

    propagateChange = (_: any) => { };

    saveData(v) {
        this.propagateChange(v);
    }

    writeValue(val: any) {
        if (this.control) {
            this._setIsRedIban(val);
            this.control.value != val && this.control.setValue(val);
        }
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

    getCMSIbanMigration() {
        const mock = {};
        return this._cms.retrieveGenericContents(CmsGenericSections.RED_IBAN).pipe(
            take(1),
            map(res => res?.contents[0]?.content),
            map(res => typeof res?.contents[0] === 'string' ? JSON.parse(res?.contents[0]) : res?.contents[0] ),
            map(content => (!content) ? mock : content),
            map(({ redIbanAbi, active }) => {
                this.redIbanAbi = redIbanAbi;
                this.checkAbi = active;
                this.control?.value && this._setIsRedIban(this.control.value);
            })
        ).subscribe()
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
      
    }

    public get floatLabelNever(): boolean {
        return this.floatLabel === 'never';
    }

    getError() {
        if (this.control.hasError('required'))
            return 'INVALIDATIONS.CAMPO_OBBLIG'; // sfrutta pipe translate su HTML

        if (this.control.hasError('patternIta') || this.control.hasError('pattern'))
            return 'Codice IBAN formalmente errato';

        return 'Campo non valido';
    }
}
