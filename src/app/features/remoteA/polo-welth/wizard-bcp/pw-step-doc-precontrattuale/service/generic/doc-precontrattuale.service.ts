import { Injectable } from '@angular/core';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';
import { GetUserInfoRequest } from '@core/components/header/header.model';
import { IVerifyCredentialsRequest } from '@shared/models/authorizationflow/authorizationflow.model';
import { Observable } from 'rxjs';

const AUTH_ROUTES = {
    createDocUrl: 'be-bffe-pw-wizard/user/documents',
    receiveDocPreontrattuale: './mock/documentazione-precontrattuale/documentazione-precontrattuale.json'
};

@Injectable()
export class DocPrecontrattualeService {
    isDisabled: boolean = true;
    constructor(private _httpHandler: HttpHandlerService) {}

    createDocumentFiles(ndg: any, abi: any, files: any): Observable<any> {
        const request: any = {
            ndg: ndg,
            abi: abi,
            files: files
        };
        const body = { bodyParameters: { ...request } };

        // Effettuo la richiesta POST per creare i file
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, AUTH_ROUTES.createDocUrl, body, {
            expiresIn: 0,
            retries: 1
        });
    }

    receiveDocumentFile(idDoc: any): Observable<any> {
        const url = `be-bffe-pw-wizard/user/documents/${idDoc}/view`;
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.GET, AUTH_ROUTES.receiveDocPreontrattuale, null, {
            mock: true
        });
    }

    // Salvataggio Documentazione
    saveDocuments(tipologia: any): Observable<any> {
        // La tipologia sarebbe la scelta se è un invio documenti tramite email oppure tramite download
        const saveDoc = `be-bffe-pw-wizard/user/documents/received`;
        const request: any = {
            tipologia: tipologia
        };
        const body = { bodyParameters: { ...request } };

        // Effettuo la richiesta POST per creare i file
        return this._httpHandler.retrieveData<GetUserInfoRequest, any>(HTTP_METHODS.POST, saveDoc, body, {
            expiresIn: 0,
            retries: 1
        });
    }
}
