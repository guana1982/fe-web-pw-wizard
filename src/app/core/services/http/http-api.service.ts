import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExecuteOrThrowErrorObservable$ } from '@shared/utils/helpers/errors-throw.helper';
import { Observable } from 'rxjs';
import { HttpApiInterface, HttpApiRequest, IHttpExtras, RequestPathParams } from './http-api.model';

/**
 *  Service handler per chiamate verso API tramite i metodi GET, POST, PUT, DELETE
 *
 * @export
 * @class HttpApiService
 * @extends {HttpApiInterface}
 */
@Injectable()
export class HttpApiService extends HttpApiInterface {
    constructor(private _http: HttpClient) {
        super();
    }

    get<T, U = any>(url: string, extras: IHttpExtras, request?: HttpApiRequest<T> | undefined): Observable<U> {
    let parsedPath;
        return ExecuteOrThrowErrorObservable$(() => {
            parsedPath = HttpApiService.parsePath(url, request?.pathParameters);

            const options = { params: this._setHttpParams(request?.bodyParameters), ...this._parseExtras(extras) };
            return this._http.get<U>(parsedPath, options);
        });
    }

    post<T, U = any>(url: string, extras: IHttpExtras, request?: HttpApiRequest<T> | undefined): Observable<U> {
    let parsedPath;
        return ExecuteOrThrowErrorObservable$(() => {
            parsedPath = HttpApiService.parsePath(url, request?.pathParameters);

            const body = request?.bodyParameters || {};
            return this._http.post<U>(parsedPath, body, {...this._parseExtras(extras)});
        });
    }

    put<T, U = any>(url: string, extras: IHttpExtras, request?: HttpApiRequest<T> | undefined): Observable<U> {
    let parsedPath;
        return ExecuteOrThrowErrorObservable$(() => {
            parsedPath = HttpApiService.parsePath(url, request?.pathParameters);

            const body = request?.bodyParameters || {};
            return this._http.put<U>(parsedPath, body, {...this._parseExtras(extras)});
        });
    }

    delete<T, U = any>(url: string, extras: IHttpExtras, request?: HttpApiRequest<T> | undefined): Observable<U> {
    let parsedPath;

        return ExecuteOrThrowErrorObservable$(() => {
            parsedPath = HttpApiService.parsePath(url, request?.pathParameters);

            const options = { params: this._setHttpParams(request?.bodyParameters), ...this._parseExtras(extras) };
            return this._http.delete<U>(parsedPath, options);
        });
    }

    /**
     * Convert the body request object in Angular HttpParams object
     *
     * @param bodyParameters
     * @returns HttpParams
     */
    private _setHttpParams(bodyParameters = {}): HttpParams {
        return new HttpParams({
            fromObject: bodyParameters
        });
    }

    /**
     * Resolve a static URL with path params '/:<path_param_name>/'
     *
     * @param url       Path URL to resolve
     * @param param     Object with Path data values
     * @returns         A resolved pathUrl
     */
    static parsePath(url: string, pathParameters: RequestPathParams): string {
        // const regex = new RegExp(`(?<=\/)(\:[a-zA-Z]+)(?=\/?)`, 'gm');
        const regex = new RegExp(`(\:[a-zA-Z]*?)(\/|$)`, 'gm');
        let resolvedPath = url.slice();
        let params;

        if (pathParameters && pathParameters.parameters) {
            const pathData = pathParameters.parameters;
            while ((params = regex.exec(url)) !== null) {
                const param = params[1];
                const paramName = param.slice(1);
                const paramValue = pathData[paramName];
                if (paramValue === undefined || paramValue === null) throw new Error(`Path param \'${paramName}\' is missing`);

                resolvedPath = resolvedPath.replace(param, paramValue);
            }
        }

        return resolvedPath;
    }

    /**
     * Parse Angular option object
     *
     * @param extras     Object with a subset of option object from Angular HttpClient
     * @returns         A parsed object based on Angular overrides
     */
    private _parseExtras( extras ) {
        let { extrasResponseType, ...rest } = extras;

        switch( extrasResponseType ) {
            case "json":
                rest['responseType'] = 'json';
                // rest['observe'] = 'events';
            break;
            case "text":
                rest['responseType'] = 'text';
            break;
            case "blob":
                rest['responseType'] = 'blob';
                // rest['observe'] = 'events';
            break;
            case "arraybuffer":
                rest['responseType'] = 'arraybuffer';
                // rest['observe'] = 'events';
            break;
        }

        return rest
    }
}
