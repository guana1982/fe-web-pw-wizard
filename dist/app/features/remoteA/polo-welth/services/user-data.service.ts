import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@bper/npm-core/http-handler';
import { Observable, of } from 'rxjs';
import { GetUserInfoRequest, GetUserInfoResponse, UserListItems } from './../../../../../app/core/components/header/header.model';
import { HTTP_METHODS } from '@bper/npm-core/http-handler';

const AUTH_ROUTES = {
    users: './mock/users.json',
    identityUtente: './mock/polo-welth/polo-welth.mock.json',
    statusWizard: './mock/polo-welth/status-wizard.mock.json',
    communicationService: './mock/polo-welth/comunication-service.mock.json',
    errorDashboard: './mock/polo-welth/error-dashboard.mock.json'
};

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    isPhoneBanking: boolean = false;
    communicationService: string;
    statusCommunicationService: boolean = false;
    hideCommunicationService: boolean = false;
    constructor(private _httpHandler: HttpHandlerService) {}

    getUserData(): Observable<any> {
        const body = { bodyParameters: { userID: 1 } };

        const url = 'URL_DEL_TUO_ENDPOINT';
        return this._httpHandler.retrieveData<GetUserInfoRequest, GetUserInfoResponse>(HTTP_METHODS.GET, AUTH_ROUTES.users, body, {
            mock: true
        });
    }

    getStatusWizard(): Observable<any> {
        const url = 'be-bffe-pw-wizard/wizard/info';
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.GET, AUTH_ROUTES.statusWizard, null, {
            mock: true
        });
    }

    getIdentifyUtente(): Observable<any> {
        const url = 'be-bffe-pw-wizard/user/identify';
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.GET, AUTH_ROUTES.identityUtente, null, {
            mock: true
        });
    }

    getCommunicationService(): Observable<any> {
        const url = '';
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.GET, AUTH_ROUTES.communicationService, null, {
            mock: true
        });
    }

    getErrorDashboard(): Observable<any> {
        const url = '';
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.GET, AUTH_ROUTES.errorDashboard, null, {
            mock: true
        });
    }
}
