import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ArkWarningStripActionType = 'SHOW' | 'HIDE' | 'HIDE_ALL';

export interface ArkWarningStripPayload {
    title?: string;
    message: string;
}

export interface ArkWarningStripAction {
    type: ArkWarningStripActionType;
    payload?: ArkWarningStripPayload;
}

@Injectable({ providedIn: 'root' })
export class ArkWarningStripService {
    // private subject
    private _actionsStream$ = new Subject<ArkWarningStripAction>();
    // public observable
    public readonly actionsStream = this._actionsStream$.asObservable();

    public readonly actionType: { [key: string]: ArkWarningStripActionType } = {
        SHOW: 'SHOW',
        HIDE: 'HIDE',
        HIDE_ALL: 'HIDE_ALL'
    };

    /**
     * make actionsStream emit a SHOW action with the provided payload
     * @param {ArkWarningStripPayload} payload
     */
    show(payload: ArkWarningStripPayload) {
        this._actionsStream$.next({ type: this.actionType.SHOW, payload });
    }

    /**
     * make actionsStream emit a HIDE action
     */
    hide() {
        this._actionsStream$.next({ type: this.actionType.HIDE });
    }

    /**
     * make actionsStream emit a HIDE_ALL action
     */
    hideAll() {
        this._actionsStream$.next({ type: this.actionType.HIDE_ALL });
    }
}
