import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService, HTTP_METHODS } from '@bper/npm-core/http-handler';
import { GetUserInfoRequest } from '@core/components/header/header.model';
import { aliasUtenteInterface } from '../../pw-step-nuove-credenziali/models/nuove-credenziali.model';

const AUTH_ROUTES = {
    getFile: './mock/download-busta-password/download-busta-password.json'
};
@Injectable()
export class DownloadBustaPasswordService {
    constructor(private _httpHandler: HttpHandlerService) {}

    getFileDownloadBustaPassword(): Observable<aliasUtenteInterface> {
        const url = 'be-bffe-pw-wizard/user/credential/envelop';
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.GET, AUTH_ROUTES.getFile, null, {
            mock: true
        });
    }
}
