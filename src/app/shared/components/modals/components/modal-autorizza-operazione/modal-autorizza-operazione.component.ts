import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TealiumUtagService } from '@bper/npm-core/tealium-utag';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { IOTPModalData } from '@shared/models/authorizationflow/authorizationflow.model';
import { AuthFlowNotificationService } from '@shared/services/auth-flow/auth-flow-notification.service';
import { AuthFlowOTPService } from '@shared/services/auth-flow/auth-flow-otp.service';
import { iif, interval, of, Subscription, throwError, timer } from 'rxjs';
import { catchError, delay, filter, map, repeatWhen, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
    selector: 'modal-autorizza-operazione',
    templateUrl: './modal-autorizza-operazione.component.html',
    styleUrls: ['./modal-autorizza-operazione.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [LoaderService]
})
export class ModalAutorizzaOperazioneComponent implements OnInit, OnDestroy {
    expireIn: number = 60; // Secondi del countdown
    intervalRefresh: number = 3000; // Intervallo di controllo di validazione notifica
    countDown: Subscription;
    pendingApproval: Subscription;
    checkConsent: any;
    private _authorized: boolean = false;
    constructor(
        public dialogRef: MatDialogRef<ModalAutorizzaOperazioneComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IOTPModalData,
        private authflow: AuthFlowNotificationService,
        private authflowOTP: AuthFlowOTPService,
        private _tealium: TealiumUtagService,
        public loader: LoaderService
    ) {}
    ngOnDestroy(): void {
        this._resetState()
    }

    ngOnInit(): void {
        const delay$ = (time) => of(time).pipe(
            delay(time)
        );
        
        const isPending$ = (status) => interval(this.intervalRefresh).pipe(
            map(_ => status === 'PENDING'),
            takeWhile(isPending => !isPending),
            filter(_ => !this._authorized),
        );

        const waitingForAuthorization$ = (res) => this.authflow
            .waitingForAuthorization(res?.scaId)
            .pipe(
                repeatWhen((res: any) => isPending$(res?.sca_status)),
                switchMap(({ sca_status }) => {

                    if ( sca_status && sca_status === 'AUTHORIZED') {
                        this._authorized = true;
                        this.loader.loading();
                        return this.data.cb().pipe(
                            tap(res => {
                                this.authflowOTP.isOTPValid.next({ status: 'SUCCESS', extras: res });
                            }),
                            catchError(err => {
                                this.authflowOTP.isOTPValid.next({ status: 'ERROR', extras: err });
                                return of(false);
                            }),
                            tap(_ => {
                                this.loader.success();
                                this._resetState();
                                this.dialogRef.close();
                            })
                        );
                    }

                    if (sca_status === 'REFUSED') {
                        const refusedMsg = "L'operazione non è stata autorizzata";
                        this._resetState();
                        this.dialogRef.close();
                        this.authflowOTP.isOTPValid.next({ status: 'ERROR', extras: { message: refusedMsg}});
                        return of(false);
                    }

                    return of();
                }),
                take(1)
            )

        this.pendingApproval = this.authflowOTP
            .sendAuthorizationRequest(this.data.operationData)
            .pipe(
                tap(_ => this.startCountDown()),
                switchMap(res => iif(
                    () => !!res.scaId,
                    delay$(this.intervalRefresh).pipe(switchMap(_ => waitingForAuthorization$(res))),
                    throwError('[SCA Authorization] scaID is missing')
                )),
                catchError(err => {

                    this.onNotificaNonArrivata();
                    return of(null)
                }),
            ).subscribe()
    }
    startCountDown() {
        this.countDown = timer(1000, 1000).subscribe(
            () => {
                this.expireIn === 0 ? this.onNotificaNonArrivata() : --this.expireIn;
            },
            err => console.log(err)
        );
    }
    onNotificaNonArrivata() {
        const pageId = this._tealium.getPageId()
        if( pageId ) this._tealium.setPageIdForChild(pageId+':genera otp').view();

        this._resetState();
        this.dialogRef.close();
        this.authflow.startOTP(this.data.operationData, this.data.cb);
    }

    private _resetState() {
        this.countDown?.unsubscribe();
        this.pendingApproval?.unsubscribe();
        this.authflowOTP.isOTPValid.next(null);
    }
}
