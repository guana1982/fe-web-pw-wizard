import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CodeEmail } from '../models/certificazione-email.model';
import { HttpHandlerService, HTTP_METHODS } from '@bper/npm-core/http-handler';
import { GetUserInfoRequest } from '@core/components/header/header.model';

const AUTH_ROUTES = {
    certificazioneMail: '',
    modifyMail: 'be-bffe-pw-wizard/user/auth/code/verify'
};
@Injectable()
export class CertificazioneEmailService {
    constructor(private _httpHandler: HttpHandlerService) {}

    certificazioneMail(email: any): Observable<any> {
        const request: any = {
            email: email
        };
        const body = { bodyParameters: { ...request } };

        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, AUTH_ROUTES.certificazioneMail, body, {
            expiresIn: 0,
            retries: 1
        });
    }

    modifyEmail(email: any, type: string): Observable<any> {
        const request: any = {
            email: email,
            type: type
        };
        const body = { bodyParameters: { ...request } };

        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, AUTH_ROUTES.modifyMail, body, {
            expiresIn: 0,
            retries: 1
        });
    }
}
