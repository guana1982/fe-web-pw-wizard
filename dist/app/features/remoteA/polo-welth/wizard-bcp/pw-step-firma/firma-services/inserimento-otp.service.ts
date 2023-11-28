import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { IbperFirmaInserimentoOtpDataSource, RequestBodyOtp, ResponseGenOtpTransaction } from '@bper/firma-feq-fe';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';

import { environment } from 'src/environments/environment';

const basePathFEQ = `${environment.apiEndPoint.BFFE_BPERBOX}/private/v1/feq/pratiche/`;

@Injectable()
export class InserimentoOtpService implements IbperFirmaInserimentoOtpDataSource {
    constructor(private router: Router, private http: HttpHandlerService) {}

    firmaDossier(idPratica: string, body: RequestBodyOtp): Observable<string> {
        // return this.http.retrieveData<any>(HTTP_METHODS.POST, basePathFEQ + idPratica + '/firma', { bodyParameters: body });
        const mockResponse = 'Firma riuscita';
        return of(mockResponse);
    }

    genOtpTransaction(idPratica: string): Observable<ResponseGenOtpTransaction> {
        // return this.http.retrieveData<any>(HTTP_METHODS.POST, basePathFEQ + idPratica + '/otp');
        const mockResponse: ResponseGenOtpTransaction = {
            idTransazioneOTP: '123456'
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
