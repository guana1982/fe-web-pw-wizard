import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CodeUtente } from '../models/convalida-cellulare.model';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';
import { GetUserInfoRequest } from '@core/components/header/header.model';

const AUTH_ROUTES = {
    convalidaNumeroCellulare: 'be-bffe-pw-wizard/user/auth/code/verify',
    richiediNuovoCodiceNumeroCellulare: '/user/auth/sms/code/'
};
@Injectable()
export class ConvalidaCellulareService {
    constructor(private _httpHandler: HttpHandlerService) {}

    convalidaORichiediNumeroCellulare(otp: number, type: any): Observable<any> {
        const request: any = {
            otp: otp,
            type: type
        };
        const body = { bodyParameters: { ...request } };

        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, AUTH_ROUTES.convalidaNumeroCellulare, body, {
            expiresIn: 0,
            retries: 1
        });
    }

    // richiediNuovoCodiceNumeroCellulare(ndg: any, abi: any): Observable<any> {
    //     const request: any = {
    //         ndg: ndg,
    //         abi: abi
    //     };
    //     const body = { bodyParameters: { ...request } };

    //     return this._httpHandler.retrieveData<GetUserInfoRequest, any>(
    //         HTTP_METHODS.POST,
    //         AUTH_ROUTES.richiediNuovoCodiceNumeroCellulare,
    //         body,
    //         {
    //             expiresIn: 0,
    //             retries: 1
    //         }
    //     );
    // }
}
