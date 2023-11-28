import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HTTP_METHODS } from '@bper/npm-core/http-handler';
import { HttpHandlerService } from '@bper/npm-core/http-handler';

const ROOT = environment.apiEndPoint.BFFE_USER_SECURITY +'/private';
const SF_ROUTES = {
    GET_CHAT_TOKEN:  ROOT +'/salesforce/v1/chat/token'
}

@Injectable({ providedIn: 'root' })
export class SalesforceManagerService {

    constructor( private _httpHandler: HttpHandlerService ) {}

    public init() {
        this._retrieveToken().pipe(
            tap((res) => {
                (window as any).getInfo4SF = () => res;
            })
        ).subscribe();
    }

    private _retrieveToken(): Observable<{ndg: string, token: string}> {
        return this._httpHandler.retrieveData(HTTP_METHODS.GET, SF_ROUTES.GET_CHAT_TOKEN);
    }
}