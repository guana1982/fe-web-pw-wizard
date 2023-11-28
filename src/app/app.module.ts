import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeIt from '@angular/common/locales/it';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@core/components/app-root/app.component';
import { AppEffects } from '@core/components/app-root/app.effects';
import { CoreModule } from '@core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';

import { metaReducers, reducers } from '@shared/store';
import { CallActionsFromStorageEffects } from '@shared/store/common/syncBrowser';
import { CustomSerializer } from '@shared/utils/utils';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

registerLocaleData(localeIt, 'it');

@NgModule({
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects, CallActionsFromStorageEffects]),
        // main components
        CoreModule
    ],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        { provide: LOCALE_ID, useValue: 'it' },
        { provide: RouterStateSerializer, useClass: CustomSerializer },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } }
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
