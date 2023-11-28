import { Injectable } from '@angular/core';
import { HTTP_METHODS } from '@bper/npm-core/http-handler';
import { GetUserInfoRequest } from '@core/components/header/header.model';
import { HttpHandlerService } from '@core/services/http/http-handler.service';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_ROUTES = {
    valueResp: './mock/identificazione-cliente/identificazione-cliente.json'
};
@Injectable()
export class IdentificazioneClienteService {
    constructor(private _httpHandler: HttpHandlerService) {}
    hideModifyEmail: boolean = false;
    private showVerificaEmailSubject = new BehaviorSubject<boolean>(false);
    showVerificaEmail$ = this.showVerificaEmailSubject.asObservable();

    setShowVerificaEmail(value: boolean) {
        this.showVerificaEmailSubject.next(value);
    }

    modifyEmail(email: any, mail: any): Observable<any> {
        const url = 'be-bffe-pw-wizard/user/auth/code';
        const request: any = {
            email: email,
            mail: mail
        };
        const body = { bodyParameters: { ...request } };

        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, url, body, {
            expiresIn: 0,
            retries: 1
        });
    }

    convalidaCodiceEmail(otp: any, type: any): Observable<any> {
        const url = 'be-bffe-pw-wizard/user/auth/code/verify';

        const request: any = {
            otp: otp,
            type: type
        };
        const body = { bodyParameters: { ...request } };

        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, url, body, {
            expiresIn: 0,
            retries: 1
        });
    }
}
