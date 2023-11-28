import { Injectable } from '@angular/core';
import { HTTP_METHODS } from '@bper/npm-core/http-handler';
import { GetUserInfoRequest } from '@core/components/header/header.model';
import { HttpHandlerService } from '@core/services/http/http-handler.service';
import { Observable } from 'rxjs';

const AUTH_ROUTES = {
    profilazione: './mock/profilazione-cliente/profilazione-cliente.json'
};

@Injectable()
export class ProfilazioneClienteService {
    constructor(private _httpHandler: HttpHandlerService) {}

    getProfilazioneCliente(): Observable<any> {
        const url = 'be-bffe-pw-wizard/user/profile';
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.GET, AUTH_ROUTES.profilazione, null, {
            mock: true
        });
    }
}
