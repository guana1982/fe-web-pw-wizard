import {Injectable} from '@angular/core';
import {HttpHandlerService} from "@bper/npm-core/http-handler";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, shareReplay, tap} from "rxjs/operators";
import {GenericObject} from "@shared/models/general.model";
import {HTTP_METHODS} from "@bper/npm-core/http-handler";
import {environment} from "../../../../environments/environment";
import {
    GetNewCommunicationsNumberResponse,
    NewDocumentsResponse
} from "@shared/models/notifications/notifications.model";

const PRODUCTS_ROOT = environment.apiEndPoint.BFFE_PRODUCTS;
const USER_DATA_ROOT = environment.apiEndPoint.BFFE_USER_DATA;

const ROUTES = {
    newCommunicationsCount: USER_DATA_ROOT + '/private/communications/v1/new-communications-count',
    newDocumentsCount: PRODUCTS_ROOT + '/private/document-archive/v1/documents/new-documents-count',
}

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private _newCommunicationsCount: BehaviorSubject<number> = new BehaviorSubject(null);
    private _newDocumentsCount: BehaviorSubject<number> = new BehaviorSubject(null);

    public newCommunicationsCount$: Observable<number> = this._newCommunicationsCount.asObservable().pipe(filter(res => !!res || res === 0), shareReplay());
    public newDocumentsCount$: Observable<number> = this._newDocumentsCount.asObservable().pipe(filter(res => !!res || res === 0), shareReplay());

    private _communicationsInitialized: boolean = false;
    private _documentsInitialized: boolean = false;

    initDocuments() {
        if (!this._documentsInitialized) {
            this._documentsInitialized = true;
            this.getNewDocumentsCount().subscribe();
        }
    }

    initCommunications() {
        if (!this._communicationsInitialized) {
            this._communicationsInitialized = true;
            this.getNewCommunicationsCount().subscribe();
        }
    }

    constructor(private _httpHandler: HttpHandlerService) {}

    getNewDocumentsCount(enableCache: boolean = false) {
        return this._httpHandler.retrieveData<null, NewDocumentsResponse>(
            HTTP_METHODS.GET,
            ROUTES.newDocumentsCount,
            {},
            {expiresIn: enableCache ? 24 * 3_600_000 : 0}
        ).pipe(
            filter(res => !!res),
            map(res => res.count),
            tap(count => (this._newDocumentsCount.next(count)))
        );
    }

    getNewCommunicationsCount(enableCache: boolean = false) {
        return this._httpHandler.retrieveData<GenericObject, GetNewCommunicationsNumberResponse>(
            HTTP_METHODS.GET,
            ROUTES.newCommunicationsCount,
            {},
            {expiresIn: enableCache ? 24 * 3_600_000 : 0}
        ).pipe(
            filter(res => !!res),
            map(res => res.count),
            tap(count => (this._newCommunicationsCount.next(count)))
        );
    }
}
