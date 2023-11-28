import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'modal-sessione-in-scadenza',
    templateUrl: './modal-sessione-in-scadenza.component.html',
    styleUrls: ['./modal-sessione-in-scadenza.component.scss'],
})
export class ModalSessioneInScadenzaComponent implements OnInit {
    counter$: Observable<number>;

    constructor(
        public dialogRef: MatDialogRef<ModalSessioneInScadenzaComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit(): void {
        this.counter$ = timer(0, 1000).pipe(
            map(count => environment.sessionEndingCountdown - count),
            tap(counter => {
                if (!counter) return this.onSessionTimeout();
            })
        );

        // if( !environment.production ) this.onContinua();
    }

    onSessionTimeout() {
        return this.dialogRef.close({ operation: 'SESSION_TIMEOUT' });
    }

    onExitSmartWeb() {
        return this.dialogRef.close({ action: 'close' });
    }

    onContinua() {
        this.dialogRef.close({ operation: 'SESSION_REFRESH' });
    }
}
