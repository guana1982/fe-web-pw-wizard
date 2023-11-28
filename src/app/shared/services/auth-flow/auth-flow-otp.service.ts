import { Injectable, OnDestroy } from '@angular/core';
import { HTTP_METHODS } from '@core/services/http/http-api.model';
import { HttpHandlerService } from '@core/services/http/http-handler.service';
import {
  IOperationAuthInfoRequest,
  IOperationAuthInfoResponse,
  IOTPStatus,
  IVerifyCredentialsRequest
} from '@shared/models/authorizationflow/authorizationflow.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiEndPoint;
const AUTH_ROUTES = {
  getQRCode: (moduleUrl) => (BASE_URL[moduleUrl] || BASE_URL.BFFE_PAYMENTS) + '/private/transaction/v2/authorization',
  authorizationV2: (moduleUrl) => (BASE_URL[moduleUrl] || BASE_URL.BFFE_PAYMENTS) + '/private/transaction/v2/authorization',
  validateOTP: 'pagamenti/mock/valida-otp.json',
  validateOTPLogin: BASE_URL.BFFE_USER_SECURITY + '/public/v1/login/web/sca-offline',
  validatePINLogin: BASE_URL.BFFE_USER_SECURITY + '/public/v1/login/web/weak',
  postLogin: BASE_URL.BFFE_USER_SECURITY + '/private/v1/login/complete',
 
};
@Injectable({
    providedIn: 'root'
})
export class AuthFlowOTPService implements OnDestroy {
    isOTPValid: BehaviorSubject<IOTPStatus> = new BehaviorSubject<IOTPStatus>(null);
    isOTPValid$: Observable<IOTPStatus> = this.isOTPValid.asObservable().pipe(filter(x => !!x));
    constructor(private _httpHandler: HttpHandlerService) //private _userData: UserDataService
    {}

    ngOnDestroy(): void {
        return console.log('DEBUG>Auth Service OTP stop');
    }

    public requestQRCode(dataOperation: IOperationAuthInfoRequest) {
        const { moduleUrl, ...bodyData } = dataOperation;
        const body = {
            bodyParameters: {...bodyData, isOnline: false}
        };
        
        return this._httpHandler
            .retrieveData<IOperationAuthInfoRequest, IOperationAuthInfoResponse>(HTTP_METHODS.POST, AUTH_ROUTES.getQRCode(moduleUrl), body, {
                expiresIn: 0,
                retries: 1
            })
            .toPromise();
    }

    public sendAuthorizationRequest(dataOperation: IOperationAuthInfoRequest) {
        const { moduleUrl, ...bodyData } = dataOperation;
        const body = {
            bodyParameters: {...bodyData, isOnline: true}
        };
        
        return this._httpHandler
            .retrieveData<IOperationAuthInfoRequest, IOperationAuthInfoResponse>(HTTP_METHODS.POST, AUTH_ROUTES.authorizationV2(moduleUrl), body, {
                expiresIn: 0,
                retries: 1
            });
    }

    /** Inutilizzato */
    public validateOTP(pinCode: string) {
        // TODO Aggiornare quando disponibile servizio
        const request = {
            username: '', //this._userData.userCredential.userId, // TODO Integrare recupero username
            otp: pinCode,
            bank: '' // TODO Integrare recupero bank
        };
        const body = { bodyParameters: { ...request } };
        return this._httpHandler.retrieveData<any, any>(HTTP_METHODS.POST, AUTH_ROUTES.validateOTP, body, {
            mock: true
        });
    }

    public validateOTPLogin(username: string, pinCode: string, bank: string) {
        const request: IVerifyCredentialsRequest = {
            username: username,
            otp: pinCode,
            bank: bank
        };
        const body = { bodyParameters: { ...request } };
        return this._httpHandler.retrieveData<IVerifyCredentialsRequest, any>(HTTP_METHODS.POST, AUTH_ROUTES.validateOTPLogin, body, {
            expiresIn: 0,
            retries: 1
        });
    }

    public validatePinLogin(username: string, pinCode: string, bank: string) {
        const request: IVerifyCredentialsRequest = {
            username: username,
            otp: pinCode,
            bank: bank
        };
        const body = { bodyParameters: { ...request } };
        return this._httpHandler.retrieveData<IVerifyCredentialsRequest, any>(HTTP_METHODS.POST, AUTH_ROUTES.validatePINLogin, body, {
            expiresIn: 0,
            retries: 1
        });
    }

    public postLogin() {
        const request = {};
        const body = { bodyParameters: { ...request } };
        return of(true);
        // return this._httpHandler.retrieveData<any, any>(HTTP_METHODS.POST, AUTH_ROUTES.postLogin, body, {
        //     expiresIn: 0,
        //     extras: {
        //         extrasResponseType: 'text',
        //         withCredentials: true
        //     }
        // });
    }
}
