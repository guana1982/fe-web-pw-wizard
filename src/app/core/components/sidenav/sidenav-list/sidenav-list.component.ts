import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavItem, NavItems, navItemsComparer, NAV_ICON_MAPPER } from "../../sidenav.model";
import { SidenavService } from "../../sidenav.service";

@Component({
    selector: "ark-sidenav-list",
    templateUrl: "./sidenav-list.component.html",
    styleUrls: ["./sidenav-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavListComponent implements OnChanges {
    @Input() navItems: NavItems = [];

    public sortedNavItems: NavItems = [];
    private _selectedNavItem: NavItem;

    ngOnChanges({ navItems }: SimpleChanges ){
        if( navItems && navItems.currentValue ) 
            this.sortedNavItems = navItems.currentValue.sort(navItemsComparer).map(this._resolveIcon.bind(this))
    }

    onItemClicked( evt: Event, navItem: NavItem ) {
        evt.preventDefault();
        evt.stopImmediatePropagation();

        if( navItem.disable ) return;
        
        if( navItem.sidebarUrl ) {
            this._sidenavService.toggleSecondary();
            this._sidenavService.navigateSidenav(navItem.sidebarUrl);
            return;
        }
        
        if( navItem.url ) {
            this._sidenavService.navigatePrimary(navItem.url);
        }else {
            this._sidenavService.resetNavigation();
        }

        this._sidenavService.closeAll();
    }

    public trackNavItems(_, item: NavItem): number {
        return item.id;
    }

    private _resolveIcon( navItem: NavItem ) {
        const icon = NAV_ICON_MAPPER[navItem.icon] || 'ic-assenza-rete';
        return {...navItem, icon};
    }

    private _isItemSelected( navItem: NavItem ): boolean {
        return this._selectedNavItem === navItem;
    }

    constructor( 
        private _router: Router,
        private _sidenavService: SidenavService,
        private _activeRouter: ActivatedRoute
    ) {}
    
}