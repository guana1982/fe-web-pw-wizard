import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { iif, Observable, of, throwError } from 'rxjs';
import { concatMap, delay, filter, retryWhen, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpApiRequest, HTTP_METHODS, IHttpDataOption, IHttpState } from './http-api.model';
import { HttpApiService } from './http-api.service';
import { HttpMockService } from './http-mock.service';
import { HttpActions } from './store/http.action-types';
import { selectHttpLastStatus, selectHttpPrevStatus, selectHttpResponse } from './store/http.selectors';

const defaultDataOptions: IHttpDataOption = {
    mock: false,
    expiresIn: 10,
    retries: 1,
    delayRetries: 1500,
    extras:  {
        headers: null,
        reportProgress: false,
        withCredentials: false,
        extrasResponseType: 'json',
    }
};

/**
 *  Service handler facade per gestione di chiamate api con modalità offline via Store
 *
 * @export
 * @class HttpApiService
 */
@Injectable()
export class HttpHandlerService {
    constructor(private _httpApiService: HttpApiService, private _httpMockService: HttpMockService, private _store: Store<any>) {}

    public retrieveData<T, U = any>(
        method: HTTP_METHODS,
        url: string,
        request?: HttpApiRequest<T>,
        options?: Partial<IHttpDataOption>
    ): Observable<U> {
        const opts = { ...defaultDataOptions, ...options };
        const extras = { ...defaultDataOptions.extras, ...(options?.extras || {})};
        const service = opts.mock ? this._httpMockService : this._httpApiService;

        /** !!! DECOMMENTARE la riga sottostante quando tutti i mock saranno rimossi da ambienti > dev */
        if (opts.mock && !environment.mock) throw new Error('Cannot access a mock file outside dev environment');

        const parsedUrl = HttpApiService.parsePath(url, request?.pathParameters);
        const requestObject = JSON.stringify(request?.bodyParameters);

        const makeApiCall = () =>
            service[method](parsedUrl, extras, request).pipe(
                retryWhen(errors =>
                    errors.pipe(
                        delay(opts.delayRetries),
                        concatMap((e, index) => (index + 1 === opts.retries ? throwError(e) : of(null)))
                    )
                ),
                tap(res =>
                    this._store.dispatch(
                        HttpActions.saveHttpCall({
                            url: parsedUrl,
                            request: requestObject,
                            response: JSON.stringify(res),
                            expiresIn: opts.expiresIn
                        })
                    )
                ),
                filter(res => !!res)
            );

        // retrieve data from store
        return this._store.select(selectHttpResponse(parsedUrl, requestObject)).pipe(
            // if store data is missing --> call API
            switchMap(httpRes => iif(() => !httpRes, makeApiCall(), of(httpRes))),
            take(1),
            // after API call --> update store with url, request / response;
        );
    }

    public retrieveLatestState<T, U = any>(
        url: string,
        request?: HttpApiRequest<T>
    ): Observable<Pick<IHttpState, 'request' | 'response' | 'url'>> {
        const parsedUrl = HttpApiService.parsePath(url, request?.pathParameters);

        // retrieve data from store
        return this._store.select(selectHttpLastStatus(parsedUrl)).pipe(
            // if store data is missing --> call API
            take(1)
            // after API call --> update store with url, request / response;
        );
    }

    public retrievePreviousState<T, U = any>(
        url: string,
        request?: HttpApiRequest<T>
    ): Observable<Pick<IHttpState, 'request' | 'response' | 'url'>> {
        const parsedUrl = HttpApiService.parsePath(url, request?.pathParameters);
        const requestObject = JSON.stringify(request?.bodyParameters);

        // retrieve data from store
        return this._store.select(selectHttpPrevStatus(parsedUrl, requestObject)).pipe(
            // if store data is missing --> call API
            take(1)
            // after API call --> update store with url, request / response;
        );
    }
}
