import { Injectable } from "@angular/core";
import { BperNotifierService } from "@shared/components/bper-notifier/service/bper-notifier.service";
import { ModalInformativaComponent } from "@shared/components/modals/components/modal-informativa/modal-informativa.component";
import { ErrorSeverity, ParsedErrorData } from "@shared/models/errors.model";
import { DialogHandlerService } from "@shared/services/dialog-handler/dialog-handler.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";


@Injectable()
export class ErrorHandlerService {

    init() {}

    public openToastNotification( error: ParsedErrorData ): Observable<boolean> {
        const { messageTitle, message } = error;

        this._notifier.show({
            type: 'error',
            title: messageTitle,
            message: message,
            close: true
        });

        return of(true);
    }

    public openModalNotification( error: ParsedErrorData ): Observable<boolean> {
        const { messageTitle: title, message: description, code: errorCode } = error;

        const ref = this._dialogHandler.configure({}).open(ModalInformativaComponent, {
            type: 'error',
            title,
            description,
            errorCode
        });

        return ref.afterClosed().pipe(map(_ => true));
    }
    
    constructor(
        private _notifier: BperNotifierService,
        private _dialogHandler: DialogHandlerService
    ){}

}