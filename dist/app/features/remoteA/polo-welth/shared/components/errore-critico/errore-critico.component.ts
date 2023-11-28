import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@bper/npm-core/utilities/loader';

@Component({
    selector: 'errore-critico',
    templateUrl: './errore-critico.component.html',
    styleUrls: ['./errore-critico.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErroreCriticoComponent implements OnInit {
    constructor(private router: Router, public _loaderService: LoaderService) {
        this._loaderService.success();
    }

    ngOnInit(): void {
        setTimeout(() => {
            // this.router.navigateByUrl('');
            // window.location.reload();
        }, 8000);
    }
}
