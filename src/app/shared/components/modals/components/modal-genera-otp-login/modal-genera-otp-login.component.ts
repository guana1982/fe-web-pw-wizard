import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { IDataModalsAuth } from '@shared/models/authorizationflow/authorizationflow.model';
import { AuthFlowOTPService } from '@shared/services/auth-flow/auth-flow-otp.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
    selector: 'modal-genera-otp-login',
    templateUrl: './modal-genera-otp-login.component.html',
    styleUrls: ['./modal-genera-otp-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ModalGeneraOtpLoginComponent implements OnInit {
    pinToValidate: any;
    private url = 'https://docs.bper.it/gruppobper/liveperson/GUIDE/BPER Smart guida Login.pdf';
    isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    isValidated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    setError: string = null;
    constructor(public dialogRef: MatDialogRef<ModalGeneraOtpLoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDataModalsAuth,
        private _authFlow: AuthFlowOTPService, private loader: LoaderService) { }

    ngOnInit(): void {
        this.isValidated.subscribe(valid => {
            if (valid) this.completeLogin();
        })
    }
    getPin() {
        return this.pinToValidate;
    }
    setPin(evn: any): void {
        this.pinToValidate = evn.pin.flatMap(obj => obj.digit)
        this.pinToValidate = this.pinToValidate.join('')
    }
    public setValidity(evn: boolean) {
        console.log(evn)
        this.isValid.next(evn)
    }
    getValidity() {
        return !this.isValid.value
    }

    onNonSaiComeFare() {
        window.open(this.url);
    }

    onContinua() {
        this.loader.loading()
        this._authFlow.validateOTPLogin(this.data.credentials.username, this.getPin(), this.data.credentials.bank).pipe(
            catchError((e) => {
                this.failedLogin();
                this.loader.error();
                return throwError(e)
            }),
            map((data) => data.status === 'success' ? this.isValidated.next(true) : this.failedLogin())
        ).subscribe(res => {
            this.loader.success();
        });

    }

    completeLogin() {
        this._close()
        return this._authFlow.postLogin().toPromise()
    }
    failedLogin(): void {
        this.setError = 'INVALID_PIN';
        return this.isValidated.next(false);
    }
    _close(): void {
        return this.dialogRef.close();
    }
}
