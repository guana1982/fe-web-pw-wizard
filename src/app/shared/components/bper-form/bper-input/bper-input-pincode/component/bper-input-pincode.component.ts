import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { configComponent } from '@shared/components/components-configurations';


@Component({
    selector: 'bper-input-pincode',
    templateUrl: './bper-input-pincode.component.html',
    styleUrls: ['./bper-input-pincode.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class BperInputPinCodeComponent implements OnInit {
    @Input('nInputs') nInputs: number = 6;
    @Input('setError') setError: string;
    @Input('disabled') disabled?: boolean = false;
    @Input('attempts') remainingAttempts?: number = 5;
    @Input() width: string = '216px';
    @Output('pin') value: EventEmitter<any> = new EventEmitter();
    @Output('isValid') isValid: EventEmitter<boolean> = new EventEmitter();

    @Input() genericErrorAllowed: boolean = false;

    errorIcon: string = configComponent.matErrorIcon;

    fieldForm: UntypedFormGroup;
    pinCodeArray = [];
    idPrefix = "pin_input_";

    constructor(private fb: UntypedFormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    onKeyInput(evn: any, position: number): void {
        let item: HTMLInputElement;
        let focus_element: string;
        // CHECK IF ALLOWED RANGE
        if (!(this.getCodeKey(evn) < 48 || (this.getCodeKey(evn) > 57)
        )) {
            focus_element = this.idPrefix + (position + 1)
        }else if(!(this.getCodeKey(evn) < 96 || this.getCodeKey(evn) > 105)) {
            focus_element = this.idPrefix + (position + 1)
        }

        if (evn.code === 'Backspace') {
            focus_element = this.idPrefix + (position - 1)
        }
        // Detect key to delete values
        if (this.getCodeKey(evn) === 8 || this.getCodeKey(evn) === 46) {
            item = document.getElementById(this.idPrefix + position) as HTMLInputElement;
            item.value = '';
            focus_element = this.idPrefix + (position - 1);
        }
        // Focus next input
        item = document.getElementById(focus_element) as HTMLInputElement
        item && item.focus({ preventScroll: true });
    }
    get PinCodeDigitsForm() {
        return this.fieldForm.get('pin') as UntypedFormArray;

    }
    validateInput(evn, position: number): boolean {
        if ((this.getCodeKey(evn) < 48 || this.getCodeKey(evn) > 57)
            && (this.getCodeKey(evn) < 96 || this.getCodeKey(evn) > 105)
            && evn.code !== 'Backspace') {
            evn.preventDefault();
            return false;
        } else {
            return true;
        }
    }
    update(): void {
        this.value.emit(this.fieldForm.value)
        this.isValid.emit(this.PinCodeDigitsForm.valid)

    }
    getCodeKey(evn) {
        return (evn.which) ? evn.which : evn.keyCode || evn.key;
    }
    createForm() {
        // Init inputs
        for (let i = 0; i < this.nInputs; i++) {
            this.pinCodeArray.push({ digit: new UntypedFormControl(undefined, [Validators.required, Validators.maxLength(1), Validators.minLength(1)]) })
        }
        this.fieldForm = this.fb.group({
            pin: this.fb.array(
                this.pinCodeArray.map(values => {
                    return this.fb.group(values)
                })
            )
        })
    }
}
