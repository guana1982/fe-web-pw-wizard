import {Injectable, OnDestroy} from '@angular/core';
import * as CMSModels from '@shared/models/cms-data.model';
import { ErrorData, ErrorSeverity, ParsedErrorData } from '@shared/models/errors.model';
import { GenericObject } from '@shared/models/general.model';
import { isBefore } from 'date-fns';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {catchError, filter, map, take, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HTTP_METHODS, RequestPathParams } from '../http/http-api.model';
import { HttpHandlerService } from '../http/http-handler.service';
import { CmsEditorialSections, CmsGenericSections, CmsInfoSections } from './cms-sections.constants';
import { CMS_TRANSLATE, CMS_TRANSLATE_TYPE } from './cms-translate.constants';
import {BankInitService} from '@core/services/bank-init/bank-init.service';
import moment from 'moment/moment';

const IS_PUBLIC = environment.public;

const STATIC_ERROR_MSG_TITLE = 'Qualcosa è andato storto!';
const STATIC_ERROR_MSG_DESCRIPTION = 'Riprova per favore.';

const BFFE_BASE_PATH = `${environment.apiEndPoint.BFFE_CMS}`;
const CMS_BASE_PATH = (isPublic: boolean = false) => `${BFFE_BASE_PATH}/${isPublic ? 'public' : 'private'}/cms`;
const CMS_URLS = {
    ERRORS: (isPublic: boolean = false) => `${CMS_BASE_PATH(isPublic)}/v3/errcode-message`,
    INFO_CONTENT: (isPublic: boolean = false) => `${CMS_BASE_PATH(isPublic)}/v4/info-content/:section`,
    EDITORIAL_CONTENT: (isPublic: boolean = false) => `${CMS_BASE_PATH(isPublic)}/v4/editorial-content/:section`,
    GENERIC_CONTENT: (isPublic: boolean = false) => `${CMS_BASE_PATH(isPublic)}/v4/generic-content/:section`
};

@Injectable({
    providedIn: 'root'
})

export class CmsDataService implements OnDestroy {
    public cmsTranslateDictionary: CMS_TRANSLATE_TYPE = {};
    private _business_info$ = new BehaviorSubject(null);
    private _confLogin$ = new BehaviorSubject(null); // place default
    private _servicesErrorsSubject = new BehaviorSubject<GenericObject<CMSModels.CMSErrorData>>(null);
    public readonly servicesErrors$ = this._servicesErrorsSubject.asObservable();
    /** List of info  */
    public readonly business_info$: Observable<any> = this._business_info$.asObservable().pipe(filter(r => !!r));
    /** Configuration Login Page  */
    public readonly confLogin$: Observable<any> = this._confLogin$.asObservable().pipe(filter(r => !!r));

    private _bankSubscription: Subscription;

    /**
     *  Access point per inizializzazione CMS
     */
    public init() {
        this.retrieveTranslateCMSPackage()
            .pipe(
                tap(pack => (this.cmsTranslateDictionary = pack)),
                take(1)
            )
            .subscribe();
        this._setServicesErrors().pipe(take(1)).subscribe();

        this._bankSubscription = this._bank.bank$.subscribe(abi => {
            this._setBusinessInfo(abi);
            this._setConfigurationInfo(abi);
        });
    }

    parseServicesError(error: ErrorData): ParsedErrorData {
        const { code = '000' } = error;
        const servicesErrors = this._servicesErrorsSubject.getValue() || {};

        // check del censimento errore su CMS
        const cmsError = servicesErrors[code?.toLowerCase()];
        const errorFound = !!cmsError ? 'Y' : 'N';

        return {
            ...error,
            messageTitle: STATIC_ERROR_MSG_TITLE,
            message: STATIC_ERROR_MSG_DESCRIPTION,
            severity: ErrorSeverity.ERROR,
            ...(cmsError || {}),
            error_mapped: errorFound
        };
    }

    /**
     *  Servizio per il recupero della lista di errori censiti a CMS
     *
     *  @param isPublic boolean. Se true, l'accesso al servizio sarà svincolato dalla sessione attiva
     *  @param body     Opzionale. Default lang = 'it'.
     *  @returns
     */
    public retrieveErrorList(isPublic: boolean = IS_PUBLIC, body = { lang: 'it' }): Observable<GenericObject<CMSModels.CMSErrorData>> {
        return this._httpClient
            .retrieveData<CMSModels.GetCMSErrorsRequest, CMSModels.GetCMSErrorsResponse>(HTTP_METHODS.GET, CMS_URLS.ERRORS(isPublic), {
                bodyParameters: { ...body }
            })
            .pipe(
                map(({ errors }) => errors || []),
                map(errors => {
                    let errs = {},
                        i = 0,
                        length = errors?.length || 0;

                    while (i < length) {
                        const code = errors[i]?.code?.toLowerCase();

                        errs[code] = errors[i];
                        i++;
                    }

                    return errs;
                })
            );
    }

    /**
     *  Servizio per il recupero della lista di contenuti editoriali censiti a CMS
     *
     *  @param section  Parametro identificativo concordato con CMS per la sezione richiesta. Va censito nel file di costanti CMS-SECTIONS
     *  @param body     Opzionale. Default lang = 'it'.
     *  @returns
     */
    public retrieveEditorialContents(section: CmsEditorialSections, body: {lang?: string, abi?: string} = {}) {
        const bodyParameters = {abi: environment.defaultAbi, lang: 'it'}; // Default values
        Object.assign(bodyParameters, body);

        const pathParameters = new RequestPathParams({ section });
        return this._httpClient.retrieveData<CMSModels.GetCMSEditorialContentsRequest, CMSModels.GetCMSEditorialContentsResponse>(
            HTTP_METHODS.GET,
            CMS_URLS.EDITORIAL_CONTENT(IS_PUBLIC),
            { bodyParameters, pathParameters },
            { expiresIn: 24 * 60 * 60000 }
        ).pipe(
            map(res => {
                const contents = res?.contents || [];
                return {
                    ...res,
                    contents: contents
                        // .filter(this._isContentValid) // Il controllo sulla data viene effettuato lato CMS
                        .map(content => ({ ...content, content: JSON.parse(content.content) }))
                };
            })
        );
    }

    /**
     *  Servizio per il recupero della lista di contenuti GENERICI censiti a CMS
     *
     *  @param section  Parametro identificativo concordato con CMS per la sezione richiesta. Va censito nel file di costanti CMS-SECTIONS
     *  @param body     Opzionale. Default lang = 'it'.
     *  @returns
     */
    public retrieveGenericContents(section: CmsGenericSections, body: {lang?: string, abi?:string} = {}) {
        const bodyParameters = {abi: environment.defaultAbi, lang: 'it'}; // Default values
        Object.assign(bodyParameters, body);

        const pathParameters = new RequestPathParams({ section });

        return this._httpClient.retrieveData<CMSModels.GetCMSGenericContentsRequest, CMSModels.GetCMSGenericContentsResponse>(
            HTTP_METHODS.GET,
            CMS_URLS.GENERIC_CONTENT(IS_PUBLIC),
            { bodyParameters, pathParameters },
            { expiresIn: 24 * 60 * 60000 }
        ).pipe(
            map(res => {
                const contents = res?.contents || [];
                return {
                    ...res,
                    contents: contents
                        // .filter(this._isContentValid) // Il controllo sulla data viene effettuato lato CMS
                        .map(content => ({ ...content, content: JSON.parse(content.content) }))
                };
            })
        );
    }

    /**
     *  Servizio per il recupero della lista di contenuti informativi/normativi censiti a CMS
     *
     *  @param section  Parametro identificativo concordato con CMS per la sezione richiesta. Va censito nel file di costanti CMS-SECTIONS
     *  @param isPublic boolean. Se true, l'accesso al servizio sarà svincolato dalla sessione attiva
     *  @param body     Opzionale. Default lang = 'it'.
     *  @returns
     */
    public retrieveInfoContents(section: CmsInfoSections, isPublic: boolean = false, body: {lang?: string, abi?:string} = {}) {
        const bodyParameters = {abi: environment.defaultAbi, lang: 'it'}; // Default values
        Object.assign(bodyParameters, body);

        const pathParameters = new RequestPathParams({ section });

        return this._httpClient
            .retrieveData<CMSModels.GetCMSInfoContentsRequest, CMSModels.GetCMSInfoContentsResponse>(
                HTTP_METHODS.GET,
                CMS_URLS.INFO_CONTENT(isPublic),
                { bodyParameters, pathParameters },
                { expiresIn: 24 * 60 * 60000 }
            )
            .pipe(/* map(res => {
            const contents = res?.contents || [];
            return { ...res, contents: contents.filter(this._isContentValid).map(content => ({...content, content: JSON.parse(content.content)})) }
        }) */);
    }

    /**
     *  Recupera contenuti statici (label, messaggi di validazione, ecc.) da CMS
     */
    public retrieveTranslateCMSPackage(isPublic: boolean = false, body = { lang: 'it' }): Observable<CMS_TRANSLATE_TYPE> {
        // Attualmente servizio assente. Previsto in ottica futura
        return of(CMS_TRANSLATE);
    }

    public getBusinessInfo(field: string) {
        return this.business_info$.pipe(map(items => items[field] || '*'));
    }

    public getConfigurationLogin(field: string) {
        return this.confLogin$.pipe(map(items => items[field] || '*'));
    }
    /**
     *  Recupera lista degli errori per i servizi censita su CMS
     *  e la rimappa per agevolarne l'utilizzo
     */
    private _setServicesErrors(): Observable<GenericObject<CMSModels.CMSErrorData>> {
        return this.retrieveErrorList(IS_PUBLIC).pipe(
            map(error => ({ ...(error || {}) })),
            tap(errorList => this._servicesErrorsSubject.next(errorList))
        );
    }

    // @deprecated - Il controllo sulla data viene effettuato lato CMS
    private _isContentValid({
            validFrom,
            validTo
        }: CMSModels.CMSInfoContent | CMSModels.CMSEditorialContent | CMSModels.CMSGenericContent): boolean {
        if (!validFrom && !validTo) return true;

        const now = moment(); // Con timezone locale
        const italyUtcOffset = moment().locale('it').isDST() ? 120 : 60; // Corretta solo in Italia - Margine di errore di un'ora altrove

        const isValidFrom = !!validFrom ? moment(validFrom).utcOffset(italyUtcOffset, true).isSameOrAfter(now, 'day') : true;
        const isValidTo = !!validTo ? moment(validTo).utcOffset(italyUtcOffset, true).isSameOrBefore(now, 'day') : true;

        return isValidFrom && isValidTo;
    }

    private _setBusinessInfo(abi: string) {
        return this.retrieveGenericContents(CmsGenericSections.BUSINESS_INFO, {abi}).pipe(
            map(result => result?.contents[0]),
            map(contents => contents?.content),
            map(content => (typeof content === 'string' ? JSON.parse(content) : content)),
            catchError(_ => of([])),
            tap(content => this._business_info$.next(content))
        ).subscribe();
    }

    private _setConfigurationInfo(abi: string) {
        return this.retrieveGenericContents(CmsGenericSections.LOGIN_PAGE_CONF, {abi}).pipe(
            map(result => result?.contents[0]),
            map(contents => contents?.content),
            map(content => (typeof content === 'string' ? JSON.parse(content) : content)),
            catchError(_ => of([])),
            tap(content => this._confLogin$.next(content))
        ).subscribe();
    }

    constructor(private _httpClient: HttpHandlerService, private _bank: BankInitService) {}

    ngOnDestroy() {
        this._bankSubscription?.unsubscribe();
    }
}
