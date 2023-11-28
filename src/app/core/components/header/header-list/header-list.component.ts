import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TealiumUtagService } from '@bper/npm-core/tealium-utag';
import { UserDataService } from '@bper/npm-core/user-data';
import { SidenavService } from '@core/components/sidenav/sidenav.service';
//import { ModalInformativaComponent } from '@shared/components/modals/components/modal-informativa/modal-informativa.component';
//import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FEATURE_MAPPING } from '../header.constants';
import { MainLink, UserList, UserListItems } from '../header.model';
import { HeaderService } from '../header.service';

@Component({
    selector: 'ark-header-list',
    templateUrl: './header-list.component.html',
    styleUrls: ['./header-list.component.scss']
})
export class HeaderListComponent implements OnInit {
    @Input() userName: string;
    @Output() logout: EventEmitter<null> = new EventEmitter();
    isUserOpen: boolean = false;
    public userList$: Observable<UserListItems>;
    public mainNavLinks$: Observable<MainLink[]>;
    public mainNavLinksList: MainLink[] = [];

    constructor(
        private _headerService: HeaderService,
        private _tealium: TealiumUtagService,
        private _sidenavService: SidenavService,
        //private _dialogHandler: DialogHandlerService,
        private _userDataService: UserDataService
    ) { }

    ngOnInit() {
        //SubHeader Menu
      /*  this.userList$ = this._sidenavService.subHeaderItems$.pipe(
            map(items =>
                items.map(item => {
                    const featureName = item.featureReference.toUpperCase();
                    const element: UserList = {
                        label: item.title,
                        active: item.active,
                        order: item.order,
                        featureReference: featureName,
                        id: item.order,
                        description: item.description,
                        visible: item.visible
                    }
                    // MIFID
                    if (!this._userDataService.grantAccessToMifid && featureName === 'SUBNAV-PROFINVMFID') {
                        return null
                    }
                    return element
                })
            ))*/

        // Header menu
       /* this.mainNavLinks$ = this._sidenavService.headerSubMenuItems$.pipe(
            map(items =>
                items.map(item => {
                    const featureName = item.featureReference.toUpperCase();
                    const element = {
                        label: item.title,
                        icon: FEATURE_MAPPING[featureName]?.icon,
                        url: FEATURE_MAPPING[featureName]?.url,
                        notification: 0,
                        canNavigate: item.active,
                        description: item.description,
                        featureReference: item.featureReference,
                        visible: item.visible
                    }
                    this.mainNavLinksList.push(element)
                    return element
                })
            )
        )*/
    }

    onMainLinkClicked(evt: Event, index) {
        evt.preventDefault();
        evt.stopImmediatePropagation();

        if (this.mainNavLinksList[index].canNavigate) {
            if (FEATURE_MAPPING[this.mainNavLinksList[index].featureReference]?.url) {
                const url = FEATURE_MAPPING[this.mainNavLinksList[index].featureReference]?.url;
                this._tealium.setNavigatedFrom('header');
                this._headerService.navigate(url);
            }
            this._headerService.toggleUserList();
        } else {
          /* return this._dialogHandler.configure({}).open(ModalInformativaComponent, {
                title: this.mainNavLinksList[index].description || 'Operazione non consentita al momento',
                type: 'info',
            })*/
        }
    }

    onItemClicked(evt: Event, userListItem: UserList) {
        evt.preventDefault();
        evt.stopImmediatePropagation();

        if (!userListItem.active) {
         /* return this._dialogHandler.configure({}).open(ModalInformativaComponent, {
                title: userListItem.description || 'Operazione non consentita al momento',
                type: 'info',
            })*/
        }

        if (FEATURE_MAPPING[userListItem.featureReference].url) {
            this._tealium.setNavigatedFrom('header');

            const url = FEATURE_MAPPING[userListItem.featureReference].url;
            this._headerService.navigate(url);
        }
        this._headerService.toggleUserList();
    }

    onLogout() {
        this.logout.emit();
    }

    onUserItemClick($event: MouseEvent) {
        this.isUserOpen = !this.isUserOpen;
        $event.preventDefault();
        $event.stopImmediatePropagation();
    }

}
