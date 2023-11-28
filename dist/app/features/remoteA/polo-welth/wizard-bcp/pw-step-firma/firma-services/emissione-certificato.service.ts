import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { RequestAcceptation, ResponseAcceptation, IbperFirmaEmissioneCertificatoDataSource } from '@bper/firma-feq-fe';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';

import { environment } from 'src/environments/environment';

const basePathFEQ = `${environment.apiEndPoint.BFFE_BPERBOX}/private/v1/feq/pratiche/`;

@Injectable()
export class EmissioneCertificatoService implements IbperFirmaEmissioneCertificatoDataSource {
    constructor(private router: Router, private http: HttpHandlerService) {}

    concentAcceptance(idPratica: string, body: RequestAcceptation): Observable<ResponseAcceptation> {
        // return this.http.retrieveData<any>(HTTP_METHODS.POST, basePathFEQ + idPratica + '/consensi', { bodyParameters: body });
        const mockResponse: ResponseAcceptation = {
            idTransazioneOtp: '123456789'
        };
        return of(mockResponse);
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
