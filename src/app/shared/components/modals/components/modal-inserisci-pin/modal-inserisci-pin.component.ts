import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDataModalsAuth } from '@shared/models/authorizationflow/authorizationflow.model';
import { AuthFlowOTPService } from '@shared/services/auth-flow/auth-flow-otp.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'modal-inserisci-pin',
    templateUrl: './modal-inserisci-pin.component.html',
    styleUrls: ['./modal-inserisci-pin.component.scss'],
    // providers: [AuthFlowOTPService],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ModalInserisciPinComponent implements OnInit {
    private pinToValidate = null;
    public isValid: boolean;
    isValidated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    constructor(public dialogRef: MatDialogRef<ModalInserisciPinComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDataModalsAuth,
        private authFlow: AuthFlowOTPService) { }

    ngOnInit(): void {
        this.isValidated.subscribe(valid => {
            if (valid) this.completeLogin();
        })
    }

    public setPin(evn: any): void {
        this.pinToValidate = evn.pin.flatMap(obj => obj.digit);
        this.pinToValidate = this.pinToValidate.join('');
    }

    private getPin(): string {
        return this.pinToValidate;
    }
    public setValidity(evn: boolean): boolean {
        this.isValid = evn;
        return this.isValid;
    }
    public onContinua() {
        this.authFlow.validatePinLogin(this.data.credentials.username, this.getPin(), this.data.credentials.bank).pipe(take(1)).subscribe(res => {
            (res.status === 'success') ? this.isValidated.next(true) : this.failedLogin()
        });
    }
    failedLogin(): void {
        return this.isValidated.next(false);
    }
    completeLogin() {
        this._close()
        return this.authFlow.postLogin().pipe(take(1)).toPromise()
    }
    _close(): void {
        return this.dialogRef.close();
    }
}
