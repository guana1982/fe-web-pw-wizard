import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthFlowNotificationService } from '@shared/services/auth-flow/auth-flow-notification.service';
import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { ModalAccessoNegatoComponent } from '../modal-accesso-negato/modal-accesso-negato.component';

@Component({
    selector: 'modal-conferma-accesso',
    templateUrl: './modal-conferma-accesso.component.html',
    styleUrls: ['./modal-conferma-accesso.component.scss'],
    providers: [AuthFlowNotificationService],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ModalConfermaAccessoComponent implements OnInit, OnDestroy {
    expireIn: number = 60; // Secondi del countdown
    intervalRefresh: number = 5000 // Intervallo di controllo di validazione notifica
    countDown: Subscription;
    checkConsent: any;
    scaID: string = null;

    constructor(public dialogRef: MatDialogRef<ModalConfermaAccessoComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _authFlow: AuthFlowNotificationService,
        private _dialogHandler: DialogHandlerService) {
        this.scaID = this.data.scaID
    }

    ngOnDestroy(): void {
        return this._close()
    }
    ngOnInit(): void {
        this.awaitConsent();
        this.startCountDown();
    }


    awaitConsent() {
        this.checkConsent = setInterval(() => {
            this._authFlow.waitingForAuthorizationLogin(this.scaID).pipe(take(1)).subscribe(res => {
                if (res.sca_status === 'AUTHORIZED') {
                    this._close();
                    this._authFlow.postLoginSCAOnline(this.data.credentials.username, this.data.credentials.password, this.data.credentials.bank, this.scaID).toPromise();
                }
                if (res.sca_status === 'REFUSED') {
                    this._close();
                    this.onAuthorizationDeny();
                }
            })
        }, this.intervalRefresh);
    }

    startCountDown() {
        this.countDown = timer(1000, 1000).subscribe(() => { this.expireIn === 0 ? this.onNotificaNonArrivata() : --this.expireIn }
            , (err) => console.log(err));
    }

    _close() {
        clearInterval(this.checkConsent);
        this.countDown.unsubscribe();
        this.dialogRef.close();
    }
    onNotificaNonArrivata() {
        this._close();
        this._authFlow.startOTPLogin(this.data.credentials);
    }
    onAuthorizationDeny() {
        this._close();
        const config = {
            width: '500px',
            maxHeight: '400px'
        }
        this._dialogHandler.configure(config).open(ModalAccessoNegatoComponent)
    }
}
