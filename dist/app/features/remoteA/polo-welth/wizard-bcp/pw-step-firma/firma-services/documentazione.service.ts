import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import {
    IBperFirmaDocumentazioneDataSource,
    RequestDocumentContent,
    ResponseDocumentContent,
    ResponseDocumentList,
    ResponseDocumentsZip
} from '@bper/firma-feq-fe';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';

import { environment } from 'src/environments/environment';
import { LoaderService } from '@bper/npm-core/utilities/loader';

const basePathFEQ = `${environment.apiEndPoint.BFFE_BPERBOX}/private/v1/feq/pratiche/`;
const AUTH_ROUTES = {
    mock: './mock/conferma-processo/conferma-processo.json',
    listaDoc: './mock/lista-documenti/lista-documenti.json',
    contenuto: './mock/contenuto-documento/contenuto-documento.json',
    doczip: './mock/doczip/doczip.json'
};

@Injectable()
export class DocumentazioneService implements IBperFirmaDocumentazioneDataSource {
    constructor(private router: Router, private http: HttpHandlerService, public _loaderService: LoaderService) {}

    getDossierStatus(idPratica: string): Observable<{ stato: string }> {
        // return this.http.retrieveData<any>(HTTP_METHODS.GET, basePathFEQ + idPratica + '/stato');
        return this.http.retrieveData<any>(HTTP_METHODS.GET, AUTH_ROUTES.mock, null, {
            mock: true
        });
    }

    getDocumentList(idPratica: string): Observable<ResponseDocumentList> {
        // return this.http.retrieveData<any>(HTTP_METHODS.GET, basePathFEQ + idPratica + '/documenti');
        return this.http.retrieveData<any>(HTTP_METHODS.GET, AUTH_ROUTES.listaDoc, null, {
            mock: true
        });
    }

    getDocumentsZip(idPratica: string): Observable<ResponseDocumentsZip> {
        // return this.http.retrieveData<any>(HTTP_METHODS.GET, basePathFEQ + idPratica + '/documenti/zip');
        return this.http.retrieveData<any>(HTTP_METHODS.GET, AUTH_ROUTES.doczip, null, {
            mock: true
        });
    }

    getDocumentContent(requestDocumentContent: RequestDocumentContent): Observable<ResponseDocumentContent> {
        //   return this.http.retrieveData<any>(
        //       HTTP_METHODS.GET,
        //       basePathFEQ + requestDocumentContent.idPratica + '/documenti/' + requestDocumentContent.idDocumento + '/contenuto'
        //   );
        return this.http.retrieveData<any>(HTTP_METHODS.GET, AUTH_ROUTES.contenuto, null, {
            mock: true
        });
    }

    updateData(): Observable<any> {
        return undefined;
    }

    nextPage(element: Array<{ outlets: { signature: string[] } }>): void {
        console.log('next page documentazione');
        this.router.navigate(element);
    }

    previousPage(element: { outlets: { signature: string[] } }[]): void {
        this.router.navigate(element);
    }
}
