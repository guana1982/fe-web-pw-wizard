import { Injectable } from '@angular/core';
import { combineLatest, fromEvent, iif, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { BROWSER_EVENTS } from './browser-info.model';

@Injectable()
export class BrowserInfoService {
    private _events$: Observable<{ type: BROWSER_EVENTS, data: Event }>;
    
    constructor() {
        this._initEvents();
    }

    /**
     *  START Browser EVENTS Handler
     */
    private _initEvents() {
        this._events$ = merge(
            fromEvent(window, BROWSER_EVENTS.ONLINE),
            fromEvent(window, BROWSER_EVENTS.OFFLINE),
            fromEvent(window, BROWSER_EVENTS.RESIZE)
        ).pipe(
            // filter(event => !!event),
            shareReplay(),
            map(event => ({ type: event.type as BROWSER_EVENTS, data: event }))
        );
    }

    public isOffline$(): Observable<boolean> {
        return this._events$.pipe(
            map(({ type }) => type),
            startWith(BROWSER_EVENTS.ONLINE),
            filter(type => !!~[BROWSER_EVENTS.OFFLINE, BROWSER_EVENTS.ONLINE].indexOf(type)),
            map(type => type == BROWSER_EVENTS.OFFLINE),
            shareReplay(),
        );
    }

    /**
     *  START screen handler 
     */
    public screenSize$(): Observable<{ width: number; height: number }> {
        return this._events$.pipe(
            filter(({ type }) => !!~[BROWSER_EVENTS.RESIZE].indexOf(type)),
            map(({ data }) => data.target as Window),
            startWith(window),
            debounceTime(150),
            map(({ innerWidth, innerHeight }) => ({ width: innerWidth, height: innerHeight })),
            shareReplay(),
        );
    }

    public isMobile$( landscapeMode: boolean = false ): Observable<boolean> {
        return this.screenSize$().pipe(map(({width, height}) => width <= 768), shareReplay())
    }

    public isTablet$( landscapeMode: boolean = false ): Observable<boolean> {
        return combineLatest([this.screenSize$(), this.isMobile$(landscapeMode)]).pipe(
            map(([{width, height}, isMobile]) => !isMobile && width <= 1024),
            distinctUntilChanged(),
            shareReplay()
        )
    }

    public isDesktop$(): Observable<boolean> {
        return this.screenSize$().pipe(map(({width, height}) => width > 1024), shareReplay())
    }
}
