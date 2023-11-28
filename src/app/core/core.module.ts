import { CommonModule } from '@angular/common';
import { HammerGestureConfig, HammerModule, Title } from '@angular/platform-browser';
import { NpmCoreModule } from '@bper/npm-core';
import { TealiumUtagModule } from '@bper/npm-core/tealium-utag';
import { BreadcrumbModule } from '@bper/npm-core/utilities/breadcrumb';
import { LoaderModule } from '@bper/npm-core/utilities/loader';
import { DIRECTION_ALL } from 'hammerjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';
import { AppMainComponent } from './components/app-main/app-main.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderService } from './components/header/header.service';
import { BankInitService } from './services/bank-init/bank-init.service';
import { NotificationBadgeComponent } from './components/header/notification-badge/notification-badge.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpHandlerService } from './services/http/http-handler.service';
import { HttpApiService } from './services/http/http-api.service';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { HeaderListComponent } from './components/header/header-list/header-list.component';
import { HttpMockService } from './services/http/http-mock.service';
import { CmsDataService } from './services/cms-data/cms-data.service';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { HTTP_FEATURE_NAME } from './services/http/store/http.reducer';
import { httpReducer } from './services/http/store/http.reducer';
import { Injectable, NgModule } from '@angular/core';
import { BrowsingComponent } from './components/footer/cobrowsing/cobrowsing.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        swipe: { direction: DIRECTION_ALL }
    };
}

@NgModule({
    declarations: [AppMainComponent, HeaderComponent, HeaderListComponent, FooterComponent, NotificationBadgeComponent, BrowsingComponent],
    imports: [
        AppRoutingModule,
        CommonModule,

        NpmCoreModule.forRoot({
            apiEndPoint: environment.apiEndPoint,
            externalUrls: environment.externalUrls,
            environmentConfig: environment
        }),
        TealiumUtagModule.forRoot({
            isProduction: environment.production,
            scriptSrc: environment.externalUrls.TEALIUM
        }),

        //UTILS
        HammerModule,
        BreadcrumbModule,
        LoaderModule.forRoot(),
        SharedModule,
        StoreModule.forFeature(HTTP_FEATURE_NAME, httpReducer)
    ],
    exports: [AppMainComponent],
    providers: [
        //Questi sono i servizi necessari al momento dell'inizializzazione dell'app TODO capire se sono da reinizializzare o questo lo si "ereditia" da SWB
        /*{
            provide: APP_INITIALIZER,
            useFactory: initWebApp,
            deps: [UserDataService, CmsDataService, SalesforceManagerService],
            multi: true
        },*/
        Title,
        HeaderService,
        BankInitService,
        HttpHandlerService,
        HttpMockService,
        HttpApiService,
        ErrorHandlerService,
        CmsDataService
    ]
})
export class CoreModule {}
