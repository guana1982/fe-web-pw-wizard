import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { UserDataService } from '@features/remoteA/polo-welth/services/user-data.service';

@Component({
    selector: 'message-handler',
    templateUrl: './message-handler.component.html',
    styleUrls: ['./message-handler.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageHandlerComponent {
    @Input() title: string;
    constructor(private router: Router, public _loaderService: LoaderService, public userDataService: UserDataService) {
        this._loaderService.success();
    }

    closeModal() {
        // Chiusura modale
        this.userDataService.hideCommunicationService = true;
    }
}
