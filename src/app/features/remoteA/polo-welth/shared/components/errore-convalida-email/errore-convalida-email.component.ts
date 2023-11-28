import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from '@bper/npm-core/utilities/loader';

@Component({
    selector: 'errore-convalida-email',
    templateUrl: './errore-convalida-email.component.html',
    styleUrls: ['./errore-convalida-email.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErroreConvalidaEmailComponent {
    constructor(private _loader: LoaderService) {
        setTimeout(() => {
            this._loader.success();
        }, 0);
    }
}
