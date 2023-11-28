import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';
import { GetUserInfoRequest } from '@core/components/header/header.model';

const AUTH_ROUTES = {
    codUtentePassword: '/user/auth/',
    verificaCodUtentePassword: '/user/auth/send'
};
@Injectable()
export class PrimoAccessoCredenzialiService {
    constructor(private _httpHandler: HttpHandlerService) {}

    ctaCodPwdTemp(codUtente: any, pswTemp: any): Observable<any> {
        const url = 'be-bffe-pw-wizard/user/credentials/verify';

        const request: any = {
            codUtente: codUtente,
            pswTemp: pswTemp
        };
        const body = { bodyParameters: { ...request } };

        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, AUTH_ROUTES.codUtentePassword, body, {
            expiresIn: 0,
            retries: 1
        });
    }

    codPwdTemp(value: any): Observable<any> {
        const url = 'be-bffe-pw-wizard/user/credentials/temp';
        const request: any = {
            value: value
        };
        const body = { bodyParameters: { ...request } };

        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, url, body, {
            expiresIn: 0,
            retries: 1
        });
    }
}
