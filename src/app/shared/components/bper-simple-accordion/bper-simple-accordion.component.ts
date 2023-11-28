import { Component, Input } from "@angular/core";
import { ErrorHandlerService } from "@core/services/error-handler/error-handler.service";
import { TealiumUtagService } from "@bper/npm-core/tealium-utag";
import { UserDataService } from "@bper/npm-core/user-data";
import { CreditorLimitations, Limitations } from "@features/pagamenti/components/altre-operazioni/models/domiciliazione.model";
import { DomiciliazioneService } from "@features/pagamenti/components/altre-operazioni/services/domiciliazioni.service";
import { AuthFlowOTPService } from "@shared/services/auth-flow/auth-flow-otp.service";
import { DialogHandlerService } from "@shared/services/dialog-handler/dialog-handler.service";
import { DownloadResourcesService } from "@bper/npm-core/utilities/downloader";
import { combineLatest, of } from "rxjs";
import { catchError, finalize, map, switchMap, tap } from "rxjs/operators";
import { LoaderService } from "@bper/npm-core/utilities/loader";

@Component({
    selector: 'bper-simple-accordion',
    templateUrl: './bper-simple-accordion.component.html',
    styleUrls: ['./bper-simple-accordion.component.scss']
})
export class BperSimpleAccordionComponent {
    @Input() creditor: boolean;
    @Input() details: boolean;
    @Input() title: string = 'Title here';
    @Input() subTitle: string | string[];
    @Input() creditorTitle: string = 'Creditor Title here';
    @Input() observable: any;
    @Input() obsItems: {};
    @Input() pdfDownload: any;

    accountId$ = this.domService.selectedAccountAction$;
    addebitoSelectedAction$ = this.domService.addebitoSelectedAction$;

    creditorLimitations$ = this.accountId$.pipe(switchMap(res => this.domService.getCreditorLimitations(res.productId)));

    debitLimitations$ = combineLatest([this.addebitoSelectedAction$, this.domService.selectedAccountAction$]).pipe(
        switchMap(([mandate, account]) =>
            this.domService.getDetailsLimitations(account.productId, mandate.mandateId, mandate.creditor.creditorId)
        )
    );

    constructor(
        private domService: DomiciliazioneService,
        private loaderService: LoaderService,
        private errorHandlerService: ErrorHandlerService,
        protected tealium: TealiumUtagService,
        protected dialogHandler: DialogHandlerService,
        protected authflow: AuthFlowOTPService,
        protected userDataService: UserDataService,
        private downloadResourcesService: DownloadResourcesService
    ) {}

    downloadPdf() {
        this.loaderService.loading();

        of(this.pdfDownload).pipe(
            tap(res => {
                const pdfList = res.pdfFileList;

                    let fileName = '';
                    let resourceData = '';

                    for (let i = 0; i < pdfList.length; i++) {
                        fileName = pdfList[i].fileName;
                        resourceData = pdfList[i].resourceData;

                        // handler download tealium
                        this.tealium.link({
                            event_action: 'click',
                            event_category: 'download',
                            event_label: 'pdf-' + fileName
                        });

                        this.downloadResourcesService.downloadResources(fileName, resourceData);
                    }
                this.loaderService.success();
            }),
                catchError(err => {
                    this.loaderService.success();
                    return this.errorHandlerService.openModalNotification(err).pipe(map(_ => false));
                }),
                finalize(() => this.loaderService.success())
            )
            .subscribe();
    }
}
