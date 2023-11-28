import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 *  Questo componente sarà utilizzato per inizializzare elementi core dell'applicativo
 *
 *  Se necessario, comanderà il lancio della login
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    constructor() {}
}
