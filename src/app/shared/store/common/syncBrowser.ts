import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, filter, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { fromEvent, of, Observable } from 'rxjs';

export const CALL_ACTIONS = '[call]';

export class CallActionAc implements Action {
    readonly type = CALL_ACTIONS;
}

@Injectable()
export class CallActionsFromStorageEffects {
    
    callActions = createEffect(() => fromEvent<StorageEvent>(window, 'storage').pipe(
        filter(evt => evt.key === '__bus'),
        filter(evt => evt.key !== null)
    ), { dispatch: false });

    constructor(private actions$: Actions) {}
}
