import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { FirmaNdgStatusResponse, IbperFirmaConfermaProcessoDataSource } from '@bper/firma-feq-fe';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';

import { environment } from 'src/environments/environment';

const basePathFEQ = `${environment.apiEndPoint.BFFE_BPERBOX}/private/v1/feq/pratiche/`;
const AUTH_ROUTES = {
    mock: './mock/conferma-processo/conferma-processo.json'
};

@Injectable()
export class ConfermaProcessoService implements IbperFirmaConfermaProcessoDataSource {
    constructor(private router: Router, private http: HttpHandlerService) {}

    getSignStatus(idPratica: string): Observable<FirmaNdgStatusResponse> {
        // return this.http.retrieveData<any>(HTTP_METHODS.GET, basePathFEQ + idPratica + '/ndg/stato');
        return this.http.retrieveData<any>(HTTP_METHODS.GET, AUTH_ROUTES.mock, null, {
            mock: true
        });
    }

    getData(): Observable<any> {
        return undefined;
    }

    updateData(): Observable<any> {
        return undefined;
    }

    nextPage(element: Array<{ outlets: { signature: string[] } }>): void {
        this.router.navigate(element);
    }

    previousPage(element: Array<{ outlets: { signature: string[] } }>): void {
        this.router.navigate(element);
    }
}
