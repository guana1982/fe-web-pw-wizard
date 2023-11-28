import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpApiInterface, HttpApiRequest, IHttpExtras } from './http-api.model';

// Path base per il recupero dei mock
const BASE_PATH = 'app/features';
// Delay (ms) introdotto per simulare una chiamata ad un servizio
const DELAY = 300;

/**
 *  Service handler per recuperare file di mock.
 *  Estende l'interfaccia dell'HttpApiService per ridurne gli impatti e renderli interscambiabili
 *
 * @export
 * @class HttpMockService
 * @extends {HttpApiInterface}
 */
@Injectable()
export class HttpMockService extends HttpApiInterface {
    constructor(private _http: HttpClient) {
        super();
    }

    get<T, U = any>(url: string, extras: IHttpExtras, request: HttpApiRequest<T> | undefined = undefined): Observable<U> {
        const completeUrl = this._getCompleteUrl(url);
        return this._retrieveMock<U>(completeUrl);
    }

    post<T, U = any>(url: string, extras: IHttpExtras, request: HttpApiRequest<T> | undefined = undefined): Observable<U> {
        const completeUrl = this._getCompleteUrl(url);
        return this._retrieveMock<U>(completeUrl);
    }

    put<T, U = any>(url: string, extras: IHttpExtras, request: HttpApiRequest<T> | undefined = undefined): Observable<U> {
        const completeUrl = this._getCompleteUrl(url);
        return this._retrieveMock<U>(completeUrl);
    }

    delete<T, U = any>(url: string, extras: IHttpExtras, request: HttpApiRequest<T> | undefined = undefined): Observable<U> {
        const completeUrl = this._getCompleteUrl(url);
        return this._retrieveMock<U>(completeUrl);
    }

    private _getCompleteUrl(url: string): string {
        return `${BASE_PATH}/${url}`;
    }
    /**
     * Recupera il mock introducendo un delay di 300ms
     *
     * @param url   Path per il recupero del mock
     * @returns     Mock se disponibile
     */
    private _retrieveMock<U>(url: string): Observable<U> {
        return this._http.get<U>(url).pipe(delay(DELAY));
    }
}
