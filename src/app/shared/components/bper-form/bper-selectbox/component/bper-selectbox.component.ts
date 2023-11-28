import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
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
    NgControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { configComponent } from '@shared/components/components-configurations';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { ArkValidators } from '@shared/validations/ark-validators';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BperSelectboxComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BperSelectboxComponent),
    multi: true
};

export interface Option {
    value: any;
    icon?: any;
    viewValue: string;
    group?: string;
}

export interface OptionGroup {
    id: string;
    label: string;
}

@Component({
    selector: 'bper-selectbox',
    templateUrl: './bper-selectbox.component.html',
    styleUrls: ['./bper-selectbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_CONTROL_VALUE_VALIDATOR],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BperSelectboxComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {
    @ViewChild('formField') formField: MatFormField;
    @ViewChild('select') select: MatSelect;
    @Input() id: string;
    @Input() label = 'Select an option';
    @Input() placeholder: string;
    @Input() options: Option[] = [];
    @Input() boxStyle = 'minimal'; // minimal OR (TODO) boxed
    @Input() boxSize = 'medium'; // medium OR small
    @Input() fontSize = '16px'; // font size options
    @Input() disable = false;
    @Input() required = false;
    @Input() multiple = false;
    @Input() enableSearch: boolean = true;
    @Input() maxSelectedAmount: number;
    @Input() msgHint: string = '';
    @Input() formControlName?: string;
    // label empty value
    @Input() emptyValue?: string;
    @Input() groups: OptionGroup[];
    @Input() validators: ValidatorFn[] = [];
    @Input() compareFunction: Function = (v1, v2) => v1 === v2;

    @Output() change: EventEmitter<MatSelectChange> = new EventEmitter();

    control: UntypedFormControl;
    public selectClass = {};

    public optionMultiFilterCtrl: UntypedFormControl = new UntypedFormControl();
    public filteredOptionsMulti: ReplaySubject<Option[]> = new ReplaySubject<Option[]>(1);
    private _onDestroy$ = new Subject<void>();

    errorIcon: string = configComponent.matErrorIcon;

    groupedOptions: any = {};

    isPanelOpen: boolean = false;

    constructor(private renderer: Renderer2, private ref: ChangeDetectorRef, private injector: Injector) {}

    public propagateChange = (_: any) => {};
    public onTouched = (_: any) => {};

    ngOnInit(): void {
        this.createGroupOptionMap();
        this.filteredOptionsMulti.next(this.options?.slice());

        this.selectClass = {
            boxed: this.boxStyle === 'boxed',
            small: this.boxSize === 'small'
        };
        this.control = new UntypedFormControl({
            value: null,
            disabled: this.disable
        });
        const ngControl = this.injector.get(NgControl);
        if (ngControl instanceof FormControlName) {
            this.control = this.injector.get(FormGroupDirective).getControl(ngControl);
        } else {
            this.control = (ngControl as FormControlDirective).form as UntypedFormControl;
        }

        this.composeValidators();

        this.optionMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this.filterOptionsMulti();
        });
    }

    ngAfterViewInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add '${implements OnChanges}' to the class.
        if (changes && changes.disable && this.control) {
            changes.disable.currentValue && this.control.disable();
            !changes.disable.currentValue && this.control.enable();
            // this.ref.markForCheck();
        }
        if (changes && changes.required && this.control) {
            this.composeValidators();
            this.control.updateValueAndValidity();
            // this.ref.markForCheck();
        }
        if (changes && changes.options && changes.options.currentValue) {
            this.filteredOptionsMulti.next(changes.options.currentValue?.slice());
        }
    }

    composeValidators() {
        // Adding validation at component level
        const validators = [];
        this.required && validators.push(Validators.required);
        this.multiple && this.maxSelectedAmount && validators.push(ArkValidators.maxSelectedAmount(this.maxSelectedAmount));
        // add extra validators
        validators.push(this.validators);
        this.control.setValidators(this.validators);
    }

    private filterOptionsMulti() {
        if (!this.options) {
            return;
        }
        // get the search keyword
        let search = this.optionMultiFilterCtrl.value;
        if (!search) {
            this.filteredOptionsMulti.next(this.options?.slice());
            return;
        } else {
            search = search.toLowerCase();
            console.log('SEARCH: ' + search);
        }
        // filter the options
        this.filteredOptionsMulti.next(this.options.filter(option => option.viewValue.toLowerCase().indexOf(search) > -1));
    }

    public unselectOption(selectedOption: MatOption) {
        const newOptionArr = (this.select.selected as MatOption[])
            .map(option => option.value)
            .filter(value => value !== selectedOption.value);
        this.control.patchValue(newOptionArr);
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();

        this.control.setErrors(null);
        this.control.setValidators(null);
    }
    getAppearance(): string {
        return this.boxStyle === 'boxed' ? 'outline' : 'legacy';
    }

    blurBox() {
        this.renderer.removeClass(this.formField._elementRef.nativeElement, 'mat-focused');
    }

    focusBox() {
        this.renderer.addClass(this.formField._elementRef.nativeElement, 'mat-focused');
    }

    onSelectionChange(event: MatSelectChange) {
        !this.multiple && this.blurBox();
        this.change.emit(event);
    }

    onPanelOpened(isPanelOpen: boolean) {
        this.isPanelOpen = isPanelOpen;
        isPanelOpen ? this.focusBox() : this.blurBox();
    }

    saveData(v) {
        this.propagateChange(v);
    }

    writeValue(val: any) {
        if (this.control && this.control.value != val) this.control.setValue(val);
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled && this.control.enabled && this.control.disable({ emitEvent: false });
        !isDisabled && this.control.disabled && this.control.enable({ emitEvent: false });
    }

    validate(control: UntypedFormControl): ValidationErrors {
        if (!control.valid) {
            return { ...control.errors, valid: false };
        }
        return null;
    }

    private createGroupOptionMap() {
        // Creazione automatica dei gruppi leggendo le chiavi group nella options
        if (!this.groups || this.groups.length === 0) {
            this.groups = [];
            this.options.forEach(opt => {
                if (
                    opt.group &&
                    !this.groups.find(grp => {
                        return grp.id === opt.group;
                    })
                ) {
                    this.groups.push({
                        id: opt.group,
                        label: opt.group
                    });
                }
            });
        }

        this.groups?.forEach(group => {
            this.groupedOptions[group.id] = this.filteredOptionsMulti
                .asObservable()
                .pipe(map(opts => opts.filter(opt => opt.group === group.id)));
        });
    }
}
