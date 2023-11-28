import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpApiService } from "@core/services/http/http-api.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { delay, first, map, shareReplay, tap } from "rxjs/operators";
import { 
    NavItems,
    sidenavPrimaryStates,
    sidenavSecondaryStates,
    sidenavPrimaryStatesMachine,
    sidenavSecondaryStatesMachine
} from "./sidenav.model";

@Injectable()
export class SidenavService {
    private _navItemsSub = new BehaviorSubject<NavItems>([]);
    private _primaryState = new BehaviorSubject<string>(sidenavPrimaryStatesMachine.initial);
    private _secondaryState = new BehaviorSubject<string>(sidenavSecondaryStatesMachine.initial);

    public navItems$ = this._navItemsSub.asObservable().pipe( shareReplay() );
    public primaryState$ = this._primaryState.asObservable().pipe(map( state => sidenavPrimaryStates[state]));
    public secondaryState$ = this._secondaryState.asObservable().pipe(map( state => sidenavSecondaryStates[state]));

    public navigatePrimary( url: string ) {
        this._router.navigate([url, {outlets: {sidenav: null} }]);
    }

    public navigateSidenav( url: string) {
        const secondaryRoute = this.isSecondaryClosed ? null : 'nav';
        this._router.navigate([url, {outlets: {sidenav: secondaryRoute} }], {skipLocationChange: false});
    }

    public resetNavigation ( ) {
        const removeAux = new RegExp('(\/?(([a-zA-z()]+)\:([a-zA-z)]+))\/?)', 'gm');
        this._router.navigate([this._router.url.replace(removeAux, ''), {outlets: {sidenav: null} }], {skipLocationChange: false});
    }

    public togglePrimary() {
        const primaryState = this._primaryState.getValue();
        if( primaryState === 'OPENED' ) this.closePrimary();
        if( primaryState === 'DEFAULT' ) this.openPrimary();
    }

    public toggleSecondary() {
        const secondaryState = this._secondaryState.getValue();
        if( secondaryState === 'OPENED' ) this.closeSecondary();
        if( secondaryState === 'DEFAULT' ) this.openSecondary();
    }

    public openPrimary() {
        this._primaryState.next(sidenavPrimaryStatesMachine.dispatch('open'));
    }

    public openSecondary() {
        this._secondaryState.next(sidenavSecondaryStatesMachine.dispatch('open'));
    }
    
    public openAll() {
        this.openPrimary();
        this.openSecondary();
    }

    public closePrimary() {
        this._primaryState.next(sidenavPrimaryStatesMachine.dispatch('close'));
    }

    public closeSecondary() {
        this._secondaryState.next(sidenavSecondaryStatesMachine.dispatch('close'));
    }
    
    public closeAll() {
        this.closePrimary();
        this.closeSecondary();
    }

    public get isSecondaryClosed(): boolean {
        return sidenavSecondaryStatesMachine.state === "DEFAULT";
    }

    private _loadNavItems(): Observable<NavItems> {
        return /* this._httpApi.get('path_to_navItems') */ of(sidenavItems).pipe(
                delay(500),
                tap( navItems => this._navItemsSub.next(navItems) ),
                first(),
            )
    }

    constructor( 
        private _httpApi: HttpApiService,
        private _router: Router
    ){
        this._loadNavItems().subscribe();
    }

}


/* 
    {
        id: number,
        url: string,
        secondaryUrl?: string,
        icon: string,
        label: string,
        order: number,
        description?: string,
        disable?: boolean,
        disableDescription?: string,
    }
*/
const sidenavItems: NavItems = [
    {
        id: 1,
        icon: 'HOME',
        url: 'home',
        label: 'Test',
        order: 1,
    },
    {
        id: 2,
        icon: 'CARTE',
        url: 'carte',
        label: 'Carte',
        order: 3,
        disable: true,
        disableDescription: 'Coming soon'
    },
    {
        id: 3,
        icon: 'TEST',
        url: 'TestComponent',
        sidebarUrl: 'TestComponent',
        label: 'Componenti di test',
        order: 2
    },
]