import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { StepService } from '../../services/step.services';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormGroup, FormControl } from '@angular/forms';
import { DialogHandlerService } from '@shared/services/dialog-handler/dialog-handler.service';
import { ModalSetInformativoComponent } from './modal-set-informativo/modal-set-informativo.component';
import { CMSSupportService } from './service/generic/cms-support.service';
import { CMSId } from './models/generics/cms.model';
import { catchError, map, tap } from 'rxjs/operators';
import { MatDialogConfig } from '@angular/material/dialog';
import { PagaPoiButtonEvent } from './models/generics/paga-poi-component.model';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { DocPrecontrattualeService } from './service/generic/doc-precontrattuale.service';
import { throwError } from 'rxjs';
import { ModalViewDocComponent } from './modal-view-doc/modal-view-doc.component';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'pw-step-doc-precontrattuale',
    templateUrl: './pw-step-doc-precontrattuale.component.html',
    styleUrls: ['./pw-step-doc-precontrattuale.component.scss'],
    providers: [CMSSupportService, DocPrecontrattualeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PwStepDocPrecontrattualeComponent implements OnInit {
    @Input() emailUtente: any;
    @Input() cardType: 'shortcutIcon' | 'shortcutIcon2' | 'product' = 'product';
    @Input() imageUrl: string;
    @Input() cardTitle: string;
    @Input() subtitle: string;
    @Input() ctaIcon: string;
    @Input() ctaLabel: string;
    @Input() titleIcon: string;
    // "True" se il testo che arriva da CMS è troppo lungo e si sovrappone all'icona (compromettendone la leggibilità)
    @Input() customContentWidth: boolean = false;
    @Input() marginBottom: string;
    @Input() customStyle: 'homepage';

    @Output() public clickCard: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() public ctaClick: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() linkClick = new EventEmitter<MouseEvent>();

    isChecked = false;
    myGroup = new UntypedFormGroup({
        checkboxName: new UntypedFormControl(false)
    });

    @Input() form: UntypedFormGroup;
    @Input() pointerOnCard: boolean = false;
    isDisabled = false;
    required = false;
    valueCheck: boolean = false;
    mockDoc: any;

    public onCardClick(event: MouseEvent) {
        event.stopPropagation();
        this.clickCard.emit(event);
    }

    public btnClick(event: MouseEvent) {
        this.ctaClick.emit(event);
    }

    toggleCheckbox() {
        if (this.isChecked) {
            console.log('check è:', this.isChecked);
        }
    }

    constructor(
        private stepService: StepService,
        private _dialogHandler: DialogHandlerService,
        private _cmsSupport: CMSSupportService,
        private _loader: LoaderService,
        private docPrecontrattualeService: DocPrecontrattualeService,
        private cdr: ChangeDetectorRef,
        private router: Router,
        public userDataService: UserDataService
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    ngOnInit(): void {
        this.mockDoc = [
            {
                id: '1234',
                docName: 'Informativa precontrattuale'
            },
            {
                id: '2345',
                docName: 'Foglio Informativo'
            },
            {
                id: '3456',
                docName: 'Guida ABF'
            }
        ];

        // TODO: Chiamata POST be-bffe-pw-wizard/user/documents dove mi restituisce il mock alla variabile this.mockDoc
        // this.docPrecontrattualeService
        //     .createDocumentFiles('ndg', 'abi', 'files')
        //     .pipe(
        //         catchError(e => {
        //             this._loader.error();
        //             this.router.navigateByUrl(`${this.router.url}/error-critic`);
        //             return throwError(e);
        //         })
        //     )
        //     .subscribe(res => {
        //         this._loader.success();
        //     });
    }

    onClickDoc(doc: any) {
        this._loader.loading();
        this._dialogHandler.defaultConfig().open(ModalViewDocComponent, { doc: doc });
    }

    cardClass = {};
    goToNextStep(): void {
        this.stepService.goToNextStep();
    }
    public onClickBtn(event: MouseEvent) {
        //this.clickBtn.emit(event);
    }

    selectAllFromRadio(event: MatCheckboxChange) {
        const { checked } = event;
        //this._selectAll(checked)
    }

    checkboxChanged() {
        console.log('Checkbox stato cambiato: ', false);
    }

    private _callBack(event, config: MatDialogConfig) {
        console.log('111 CHIAMO _callBack event.action: ' + event);
        switch (event) {
            case PagaPoiButtonEvent.PRIMARY_ACTION:
                this._downloadAll();
                break;
            case PagaPoiButtonEvent.SECONDARY_ACTION:
                this._sendMail(config);
                break;
            default:
                break;
        }
    }

    private _downloadAll() {
        // TODO: SCOMMENTARE CHIAMATA DOWNLOAD

        // this.docPrecontrattualeService
        //     .saveDocuments('download')
        //     .pipe(
        //         catchError(e => {
        //             this._loader.error();
        //                 this.router.navigateByUrl(`${this.router.url}/error-critic`);
        //             return throwError(e);
        //         })
        //     )
        //     .subscribe(res => {
        //         this._loader.success();
        //     });
        this.docPrecontrattualeService.isDisabled = false;
        this.cdr.detectChanges();
        console.log('donwnload');
    }

    private _sendMail(config: MatDialogConfig) {
        // TODO: SCOMMENTARE CHIAMATA PER INVIARE EMAIL
        this._loader.loading();
        // this.docPrecontrattualeService
        //     .saveDocuments('mail')
        //     .pipe(
        //         catchError(e => {
        //             this._loader.error();
        // this.router.navigateByUrl(`${this.router.url}/error-critic`);
        //             return throwError(e);
        //         })
        //     )
        //     .subscribe(res => {
        //         this._loader.success();
        //     });
        this._cmsSupport
            .getCMSDataModal(CMSId.MODAL_SENT_DOCUMENTS)
            .pipe(
                map(cmsData => {
                    return {
                        ...cmsData,
                        descriptionHtml: this._cmsSupport.parseString(cmsData.descriptionHtml, { email: this.emailUtente })
                    };
                }),
                tap(cmsData => {
                    const ref = this._dialogHandler.configure(config).open(ModalSetInformativoComponent, cmsData);

                    ref.afterClosed().subscribe(_ => {
                        this.docPrecontrattualeService.isDisabled = false;
                        this.cdr.detectChanges();
                    });
                }),
                tap(() => this._loader.success())
            )
            .subscribe();
    }

    openModalInfo() {
        const config: MatDialogConfig = {
            width: '470px'
        };

        this._cmsSupport
            .getCMSDataModal(CMSId.MODAL_SEND_INFORMATIVE_SET)
            .pipe(
                tap(cmsData => {
                    const ref = this._dialogHandler.configure(config).open(ModalSetInformativoComponent, cmsData);
                    ref.afterClosed().subscribe(res => {
                        console.log('eccomi: ' + JSON.stringify(res));
                        this._callBack(res, config);
                    });
                }),
                tap(_ => this._loader.success())
            )
            .subscribe();
    }

    /*openModalInfo(): void {

   

    const ref = this._dialogHandler
        .defaultConfig()
        .open(ModalSetInformativoComponent, {setInformativo: 'setInformativo'});

        ref.afterClosed().subscribe((data) => { console.log('onClose -> ', data); });

  }*/
}
