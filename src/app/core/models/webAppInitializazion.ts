import { UserDataService } from '@bper/npm-core/user-data';
import { SalesforceManagerService } from '@core/services/salesforce-manager/salesforce-manager.service';
import { of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CmsDataService } from '@core/services/cms-data/cms-data.service';

export function initWebApp(
    userDataService: UserDataService,
    cmsService: CmsDataService,
    sfService: SalesforceManagerService
) {
    return () => {
        const [_domain, qp] = location.href.split('?');
        const qpParsed = (qp || '').split('&').reduce((acc, cur) => {
            const [key, value] = cur.split('=');
            return { ...acc, [key]: value };
        }, {});

        return initAppStart
            .call(userDataService, qpParsed)
            .pipe(
                tap(_ => cmsService.init()),
                tap(_ => sfService.init())
            )
            .toPromise();
    };
}

function initAppStart(parameters) {
    let flow$;
    const isPhoneTOL = parameters['application'] === 'PHONE_TOL';

    if (parameters['grant-access'] === 'true') {
        flow$ = this._onLoginComplete();
    } else if (isPhoneTOL && !!parameters['u'] && !!parameters['bank']) {
        flow$ = this._onLoginPB(parameters['u'], parameters['bank']);
    }

    const user$ = this._retrieveUserData().pipe(
        tap(_ => this._setUserBranchData()),
        tap(_ => this._setUserAccesses())
    );

    let redirect = false;
    flow$ = !!flow$ ? flow$.pipe(tap(_ => (redirect = true))) : of(true);

    return flow$.pipe(
        switchMap(_ => {
            if (redirect) {
                setTimeout(_ => {
                    location.replace(environment.production ? '/swb/' : '/');
                }, 0);
                return throwError('');
            }
            return of(true);
        }),
        switchMap(_ => user$),
        catchError(error => {
            if (!error) return throwError(error);

            if (isPhoneTOL) {
                location.href = environment.externalUrls.NPM_PHONE_BANKING;
            } else {
                location.href = environment.externalUrls.NPM_PUBLIC;
            }

            return throwError(error);
        })
    );
}
