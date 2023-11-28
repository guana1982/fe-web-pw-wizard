import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { IbperFirmaRichiestaCertificatoDataSource, ResponseCertificateModule } from '@bper/firma-feq-fe';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';

import { environment } from 'src/environments/environment';

const basePathFEQ = `${environment.apiEndPoint.BFFE_BPERBOX}/private/v1/feq/pratiche/`;
const AUTH_ROUTES = {
    module: './mock/modulo-certificato/modulo-certificato.json'
};
@Injectable()
export class RichiestaCertificatoService implements IbperFirmaRichiestaCertificatoDataSource {
    constructor(private router: Router, private http: HttpHandlerService) {}

    getData(): Observable<any> {
        return undefined;
    }

    getCertificateModule(idPratica: string): Observable<ResponseCertificateModule> {
        // return this.http.retrieveData<any>(HTTP_METHODS.GET, basePathFEQ + idPratica + '/modulo-certificato');
        return this.http.retrieveData<any>(HTTP_METHODS.GET, AUTH_ROUTES.module, null, {
            mock: true
        });
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
