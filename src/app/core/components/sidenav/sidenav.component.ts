import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { 
    NavItems
} from "./sidenav.model";
import { SidenavService } from "./sidenav.service";

@Component({
    selector: "ark-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SidenavService],
})
export class SidenavComponent implements OnInit {
    public navItems$: Observable<NavItems>;
    public primaryState$ = this._sidenavService.primaryState$;
    public secondaryState$ = this._sidenavService.secondaryState$;
    
    ngOnInit () {
        this.navItems$ = this._sidenavService.navItems$;
    }

    onOverlayClick( event: Event ){
        event.preventDefault();
        event.stopPropagation();
        
        this._sidenavService.resetNavigation();
        this._sidenavService.closeAll();
    }

    public togglePrimary() {
        this._sidenavService.togglePrimary();
    }

    public openPrimary() {
        this._sidenavService.openPrimary();
    }

    public openSecondary() {
        this._sidenavService.openSecondary();
    }

    public closePrimary() {
        this._sidenavService.closePrimary();
    }

    public closeSecondary() {
        this._sidenavService.closeSecondary();
    }

    constructor(
        private _sidenavService: SidenavService
    ) { }
}