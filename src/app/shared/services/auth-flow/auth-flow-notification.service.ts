import { Injectable, OnDestroy } from '@angular/core';
import { HTTP_METHODS } from '@core/services/http/http-api.model';
import { HttpHandlerService } from '@core/services/http/http-handler.service';
//import { ModalGeneraOtpLoginComponent } from '@shared/components/modals/components/modal-genera-otp-login/modal-genera-otp-login.component';
//import { ModalGeneraOtpComponent } from '@shared/components/modals/components/modal-genera-otp/modal-genera-otp.component';
import { IOperationAuthInfoRequest, IPollingAuthResponse, IPostLoginSCARequest, IVerifyCredentialsRequest } from '@shared/models/authorizationflow/authorizationflow.model';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DialogHandlerService } from '../dialog-handler/dialog-handler.service';
const BASE_URL = environment.apiEndPoint;
const AUTH_ROUTES = {
  waitingForAuthorizationLogin: '/pl-multic-sca/api/v1/sca/login/',
  waitingForAuthorization: '/pl-multic-sca/api/v1/sca/operation/',
  postLoginSCAOnline: BASE_URL.BFFE_USER_SECURITY + '/public/v1/login/web/sca-online'
};

@Injectable({
  providedIn: 'root',
})
export class AuthFlowNotificationService implements OnDestroy {
  constructor(
    private _httpHandler: HttpHandlerService, private _dialogHandler: DialogHandlerService
  ) { }

  ngOnDestroy(): void {
    return console.log('DEBUG>Auth Service Notification stop')
  }


  public waitingForAuthorizationLogin(scaID: string) {
    const body = {};
    return this._httpHandler.retrieveData<any, IPollingAuthResponse>(HTTP_METHODS.GET, AUTH_ROUTES.waitingForAuthorizationLogin + scaID, body, {
      expiresIn: 0,
      retries: 1,
      extras: {
        extrasResponseType: 'json',
        headers: {
          'x-request-id': scaID + '_' + Date.now().toString(),
          'application': 'Smartweb'
        }
      }
    }).pipe(
      catchError((err: any) => {
        return throwError(err);
      }),
    )
  }

  public waitingForAuthorization(scaID: string) {
    const body = {};
    return this._httpHandler.retrieveData<any, any>(HTTP_METHODS.GET, AUTH_ROUTES.waitingForAuthorization + scaID, body, {
      expiresIn: 0,
      retries: 1,
      extras: {
        extrasResponseType: 'json',
        headers: {
          'x-request-id': scaID + '_' + Date.now().toString(),
          'application': 'Smartweb'
        }
      }
    }).pipe(
      catchError((err) => {
        return throwError(err)
      })
    )
  }
  public startOTP(operationData: IOperationAuthInfoRequest, cb) {
    /*const config = {
      width: '488px',
      maxHeight: '535px'
    }
    return this._dialogHandler.configure(config).open(ModalGeneraOtpComponent, { operationData: operationData, cb })
    */

  }
  public startOTPLogin(credentials: IVerifyCredentialsRequest ) {
   /* const config = {
      width: '655px',
      maxHeight: '287px'
    }
    return this._dialogHandler.configure(config).open(ModalGeneraOtpLoginComponent,{credentials: credentials} )
    */

  }
  public postLoginSCAOnline(username: string, password: string, bank: string, scaId: string) {
    const request = {
      "username": username,
      "bank": bank,
      "scaId": scaId,
      "password": password
    }
    const body = { bodyParameters: { ...request } };
    return this._httpHandler.retrieveData<IPostLoginSCARequest, any>(HTTP_METHODS.POST, AUTH_ROUTES.postLoginSCAOnline, body, {
      expiresIn: 0,
      extras: {
        extrasResponseType: 'text',
        withCredentials: true,
      }
    });
  }

}