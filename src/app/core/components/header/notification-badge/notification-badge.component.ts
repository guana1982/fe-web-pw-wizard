import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { MainLink } from '@core/components/header/header.model';

@Component({
    selector: 'notification-badge',
    templateUrl: './notification-badge.component.html',
    styleUrls: ['./notification-badge.component.scss']
})
export class NotificationBadgeComponent implements OnInit {
    @Input() feature: MainLink;
    counter$: Observable<number>;

    constructor(private _notificationsService: NotificationsService, private _router: Router) {}

    ngOnInit(): void {
        this._initRetrieve(this.feature);
    }

    private _initRetrieve(feature: MainLink) {
        if (!(feature.canNavigate && feature.visible)) return;

        switch (feature.featureReference) {
            case 'ALT-DOCUMENT':
                this._notificationsService.initDocuments();
                this.counter$ = this._notificationsService.newDocumentsCount$;
                break;

            case 'ALT-COMUNICAZ':
                this._notificationsService.initCommunications();
                this.counter$ = this._notificationsService.newCommunicationsCount$;
                break;
        }
    }
}
