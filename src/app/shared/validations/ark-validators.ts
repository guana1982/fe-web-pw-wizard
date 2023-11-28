import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';

export class ArkValidators {
    static get isNumber(): ValidatorFn {
        return function (control) {
            if (!Number(control.value)) {
                return { notNumber: true };
            }
            return null;
        };
    }

    static numberMaxLength(max: number): ValidatorFn {
        return function (control) {
            if (!!control.value) {
                return control.value.toString().length > max ? { maxlength: true } : null;
            }
        };
    }

    static numberMinLength(min: number): ValidatorFn {
        return function (control) {
            if (!!control.value) {
                return control.value.toString().length < min ? { minlength: true } : null;
            }
        };
    }

    static checkStepImporto(step: number): ValidatorFn {
        return function (control) {
            if (control.value % step) {
                return { importoForbidden: true };
            }
            return null;
        };
    }

    static checkStepDurata(step: number): ValidatorFn {
        return function (control) {
            if (control.value % step) {
                return { valueForbidden: true };
            }
            return null;
        };
    }

    static get noSpecialChar(): ValidatorFn {
        return Validators.pattern('[a-zA-Z0-9]+$');
    }

    static maxSelectedAmount(max: number): ValidatorFn {
        return function (control) {
            if (!!control.value) {
                return control.value.length > max ? { maxAmountExceeded: true } : null;
            }
        };
    }

    static get emailPattern(): ValidatorFn {
        return Validators.pattern('^[a-zA-Z0-9_.%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    }

    static get atLeastOneFieldCompiled(): ValidatorFn {
        return function ( fGroup: UntypedFormGroup ) {
            const controls = fGroup.controls;

            return !!Object.keys(controls || {}).every((key: string) => {
                return !controls[key].value
            }) ? { formEmpty: true }: null;
        };
    }
}
