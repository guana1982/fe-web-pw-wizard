import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {distinctUntilChanged, filter, shareReplay} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * Service used to initialize bank from query params on login
 */
@Injectable()
export class BankInitService {
    private _bankSub = new BehaviorSubject(null);
    public bank$ = this._bankSub.asObservable().pipe(
        filter(v => !!v),
        distinctUntilChanged(),
        shareReplay(1),
    );

    public initBank(bank) {
        if (bank) this._bankSub.next(bank);
    }

    get getAbi() {
        return this._bankSub.getValue() || environment.defaultAbi;
    }
}
