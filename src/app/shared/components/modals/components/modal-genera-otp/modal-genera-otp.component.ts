import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { IOperationAuthInfoRequest, IOTPModalData } from '@shared/models/authorizationflow/authorizationflow.model';
import { ParsedErrorData } from '@shared/models/errors.model';
import { AuthFlowOTPService } from '@shared/services/auth-flow/auth-flow-otp.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

@Component({
    selector: 'modal-genera-otp',
    templateUrl: './modal-genera-otp.component.html',
    styleUrls: ['./modal-genera-otp.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
    //providers: [AuthFlowOTPService]
})
export class ModalGeneraOtpComponent implements OnInit {
    @Input('modal-title') modalTitle: string;
    public QRData: string;
    setError: string;
    pinToValidate = null;
    statusForm: boolean = false;
    remainingAttempts: number;

    qrCodeLoadError$ = new BehaviorSubject<ParsedErrorData>(null);

    constructor(
        public dialogRef: MatDialogRef<ModalGeneraOtpComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IOTPModalData,
        public _authFlow: AuthFlowOTPService,
        private loader: LoaderService
    ) { }

    ngOnInit(): void {
        this.setupQRCode(this.data.operationData);
        this._authFlow.isOTPValid$.pipe(take(1)).subscribe(res => {
            this._close();
        });
    }

    setPin(evn: any): void {
        this.pinToValidate = evn.pin.flatMap(obj => obj.digit);
        this.pinToValidate = this.pinToValidate.join('');
    }
    getPin(): string {
        return this.pinToValidate;
    }
    getStatusForm(evn) {
        this.statusForm = evn;
    }
    setupQRCode(data: IOperationAuthInfoRequest) {
        if (!!data)
            return this._authFlow.requestQRCode(data).then(
                res => (this.QRData = res.encryptedData),
                err => this.qrCodeLoadError$.next(err)
            );
    }

    public onContinua() {
        this.loader.loading();
        this.data.cb(this.getPin()).pipe(
            tap(data => this._authFlow.isOTPValid.next({ status: 'SUCCESS', otp: this.getPin(), extras: data })),
            catchError(err => {
                this.loader.error();

                if (!~err.code?.indexOf('CKOTP-B004') && !~err.code?.indexOf('CKOTP-B201')) {
                    this._authFlow.isOTPValid.next({ status: 'INVALID_PIN', otp: undefined, extras: err });
                    return throwError(err);
                }

                this.setError = 'INVALID_PIN';
                this.remainingAttempts = err?.additionalData?.REMAINING_ATTEMPTS;
                return of(null);
            })
        )
            .subscribe(x => {
                this.loader.success();
            });
    }
    _close() {
        this.dialogRef.close();
    }

    refreshQrCode() {
        this.qrCodeLoadError$.next(null);
        this.setupQRCode(this.data.operationData);
    }
}
