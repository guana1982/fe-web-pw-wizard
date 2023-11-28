import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type BperNotifierType = 'error' | 'warning' | 'success' | 'info' | 'default';

export type BperNotifierActionType = 'SHOW' | 'SHOW_SMALL' | 'HIDE_ALL';

export interface BperNotifierPayload {
    type: BperNotifierType;
    title?: string;
    message: string;
    subMessage?: string;
    iconLeft?: string;
    close?: boolean;
}

export interface BperNotifierAction {
    type: BperNotifierActionType;
    payload?: BperNotifierPayload;
}

@Injectable({
    providedIn: 'root'
})
export class BperNotifierService {
    // private subject
    private _actionsStream$ = new Subject<BperNotifierAction>();
    // public observable
    public readonly actionsStream = this._actionsStream$.asObservable();

    public readonly actionType: { [key: string]: BperNotifierActionType } = {
        SHOW: 'SHOW',
        SHOW_SMALL: 'SHOW_SMALL',
        HIDE_ALL: 'HIDE_ALL'
    };

    public readonly defaultTitleMap = {
        error: 'ERRORE',
        success: 'SUCCESSO',
        warning: 'ATTENZIONE',
        info: 'ATTENZIONE',
        default: 'ATTENZIONE'
    };

    /**
     * make actionsStream emit a SHOW action with the provided payload
     * use a default title if it's not provided
     * @param {BperNotifierPayload} payload
     */
    public show(payload: BperNotifierPayload) {
        const nomalizedPayload = this.getNormalizedPayload(payload);
        this._actionsStream$.next({ type: this.actionType.SHOW, payload: nomalizedPayload });
    }

    /**
     * make actionsStream emit a SHOW_SMALL action with the provided payload
     * @param {BperNotifierPayload} payload
     */
    public showSmall(payload: BperNotifierPayload) {
        this._actionsStream$.next({ type: this.actionType.SHOW_SMALL, payload });
    }

    /**
     * make actionsStream emit a HIDE_ALL action
     */
    public hideAll() {
        this._actionsStream$.next({ type: this.actionType.HIDE_ALL });
    }

    /**
     * returns a ArkNotifierPayload with a default title if a title is not provided
     * @param {BperNotifierPayload} payload
     * @returns {BperNotifierPayload}
     */
    private getNormalizedPayload(payload: BperNotifierPayload): BperNotifierPayload {
        if (payload.title) {
            return payload;
        }
        const title = this.getDefaultTitle(payload.type);

        return { ...payload, title };
    }

    /**
     * returns a default title based on the type
     * @param {BperNotifierType} type
     * @returns {string}
     */
    private getDefaultTitle(type: BperNotifierType): string {
        return this.defaultTitleMap[type];
    }
}
