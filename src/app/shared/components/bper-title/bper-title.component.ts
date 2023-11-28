import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'bper-title',
    templateUrl: './bper-title.component.html',
    styleUrls: ['./bper-title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperTitleComponent {}
