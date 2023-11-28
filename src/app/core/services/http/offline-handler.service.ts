import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BrowserInfoService } from '../browser-info/browser-info.service';
import { HttpCachedItem } from './http-api.model';

@Injectable()
export class OfflineHandlerService {
    constructor(private _browserInfo: BrowserInfoService) {}

    public validateCache<T = any, U = any>(httpCachedItem: HttpCachedItem<T, U>): Observable<HttpCachedItem<T, U> | null> {
        return forkJoin([this.isOffline(), this.isValid(httpCachedItem)]).pipe(
            map(([isOffline, isValid]) => {
                if (!!isOffline || !!isValid) return httpCachedItem;

                return null;
            }),
            tap(_ => console.log('can Retrieve from store-> ', _))
        );
    }

    public isOffline(): Observable<boolean> {
        return this._browserInfo.isOffline$().pipe(tap(isOffline => /* set error message if is offline */ isOffline));
    }

    public isValid(httpCachedItem: HttpCachedItem<any>): Observable<boolean> {
        return of(httpCachedItem).pipe(map(item => !!item && item.expAt > Date.now()));
    }
}
