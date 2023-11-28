import { HttpHeaders } from '@angular/common/http';
import { GenericObject } from '@shared/models/general.model';
import { Observable } from 'rxjs';

export abstract class HttpApiInterface {
    abstract get<T, U = any>(path: string, extras: IHttpExtras, request?: HttpApiRequest<T> | undefined): Observable<U>;
    abstract post<T, U = any>(path: string, extras: IHttpExtras, request?: HttpApiRequest<T> | undefined): Observable<U>;
    abstract put<T, U = any>(path: string, extras: IHttpExtras, request?: HttpApiRequest<T> | undefined): Observable<U>;
    abstract delete<T, U = any>(path: string, extras: IHttpExtras, request?: HttpApiRequest<T> | undefined): Observable<U>;
}

export type HttpApiRequest<T = any> = Partial<{
    // path params
    pathParameters: RequestPathParams;
    // query params per GET/DELETE o body params per POST/PUT
    bodyParameters: T;
}>;

export class RequestPathParams {
    private _params: GenericObject<string> = {};

    constructor(params?: GenericObject<string>) {
        if (params) {
            Object.keys(params).forEach(param => this.add(param, params[param]));
        }
    }

    /**
     * Add a parameter
     *
     * @param name      Property name
     * @param value     Value name
     * @returns         This instance
     */
    public add(name: string, value: string | number): RequestPathParams {
        this._params[name] = typeof value === 'number' ? value.toString() : value;
        return this;
    }

    public get parameters(): GenericObject<string> {
        return this._params;
    }
}

/**
 *  Interfaccia per il salvataggio della chiamata a API esterne
 */
export interface HttpCachedItem<T, U = any> {
    /** url to call */
    url: string;
    /** request object to store (as JSON string?) */
    request?: T;
    /** response object to store (as JSON string?) */
    response?: U;
    /** Time in ms, last update time */
    lastUpdate: number;
    /** Time in ms, set how the selected element will be valid for */
    expIn: number;
    /** Time in ms, set when the selected element will be expire */
    expAt: number;
}

/**
 *  Enum per la selezione del metodo http adatto all'url selezionato
 */
export enum HTTP_METHODS {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export interface IHttpDataOption {
    /** If true, the service would retrieve a json file */
    mock: boolean;
    /** Define the duration of the data inside the store, in ms */
    expiresIn: number;
    /** Retry times after an api error */
    retries: number;
    /** Delay retries, in ms */
    delayRetries: number;
    /** Oggetto option di HttpClient.
     * @see {@link https://v11.angular.io/api/common/http/HttpClient|Angular Doc}
     */
    extras: IHttpExtras;
}

export interface IHttpExtras {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    reportProgress?: boolean;
    withCredentials?: boolean;
    extrasResponseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}

export interface IHttpState {
    url: string;
    request?: string;
    response?: string;
    lastUpdate: number;
    expIn: number;
    expAt: number;
}

export function httpSortComparer(a, b): number {
    if (a.lastUpdate > b.lastUpdate) return 1;

    if (a.lastUpdate < b.lastUpdate) return -1;

    return 0;
}

export function getHttpStoreId({ url, request = '' }: Partial<IHttpState>): string {
    return `${url}::${request}`;
}

export function isStateValid(state: IHttpState): boolean {
    return !!state && !!state.response && state.expAt > Date.now();
}
