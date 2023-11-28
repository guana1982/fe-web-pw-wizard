import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TealiumUtagService } from '@bper/npm-core/tealium-utag';
import { BreadcrumbService } from '@bper/npm-core/utilities/breadcrumb';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { HeaderService } from '@core/components/header/header.service';
import { UserDataService } from '@bper/npm-core/user-data';

@Component({
    selector: 'app-main',
    templateUrl: './app-main.component.html',
    styleUrls: ['./app-main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMainComponent implements OnInit {
    private routerSubscription: Subscription;
    constructor(
        private router: Router,
        private _tealium: TealiumUtagService,
        public breadcrumbService: BreadcrumbService,
        public loaderService: LoaderService,
        private _headerService: HeaderService,
        private _userDataService: UserDataService
    ) {}

    ngOnInit() {
        this.loaderService.loading();

        // sottoscrizione per caricamento pagina
        this.routerSubscription = this.router.events
            .pipe(
                filter(evt => evt instanceof NavigationStart || evt instanceof NavigationEnd || evt instanceof NavigationCancel),
                tap(evt => evt instanceof NavigationEnd && evt.url !== evt.urlAfterRedirects && this._tealium.resetPageId())
            )
            .subscribe(evt => {
                if (evt instanceof NavigationStart) {
                    this.loaderService.loading();
                }
            });
    }

    get isHeaderExpanded(): boolean {
        return this._headerService.isExpanded;
    }

    @HostListener('window:unload')
    unloadHandler() {
        this.routerSubscription?.unsubscribe();
    }
}
