import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@bper/npm-core/utilities/loader';

@Component({
    selector: 'errore-dashboard',
    templateUrl: './errore-dashboard.component.html',
    styleUrls: ['./errore-dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErroreDashboardComponent {
    constructor(private router: Router, public _loaderService: LoaderService) {
        this._loaderService.success();
    }

    goToBank() {
        
    }
}
