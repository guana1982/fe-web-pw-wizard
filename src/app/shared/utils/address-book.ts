import {UntypedFormGroup} from "@angular/forms";
import {cleanObject} from "@shared/utils/helpers/utils.helper";
import {take} from "rxjs/operators";

export function getAddBeneficiaryInput(inputForm: UntypedFormGroup) {
    return cleanObject({
        saveBeneficiary: inputForm.get('saveBeneficiary')?.value,
        recipientName: inputForm.get('recipientName')?.value,
        recipientNickname: inputForm.get('recipientNickname')?.value,
        recipientGroupId: inputForm.get('recipientGroupId')?.value
    });
}

export function getAddBeneficiaryFromResponse(res: any) {
    return cleanObject({
        saveBeneficiary: res?.saveBeneficiary,
        recipientName: res?.recipientName,
        recipientNickname: res?.recipientNickname,
        recipientGroupId: res?.recipientGroupId
    })
}

export function disableSaveBeneficiary(inputForm: UntypedFormGroup, controlName: string[] | string) {
    const saveBeneficiaryCtrl = inputForm?.get('saveBeneficiary');
    const toResetCtrl = inputForm?.get(controlName);

    saveBeneficiaryCtrl?.patchValue(false);
    if (toResetCtrl) {
        saveBeneficiaryCtrl?.disable();
        toResetCtrl.valueChanges.pipe(take(1)).subscribe(() => saveBeneficiaryCtrl?.enable());
    }
}
