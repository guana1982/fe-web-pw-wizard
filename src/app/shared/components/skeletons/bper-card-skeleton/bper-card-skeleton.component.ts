import {Component, Input} from '@angular/core';

@Component({
    selector: 'bper-card-skeleton',
    templateUrl: './bper-card-skeleton.component.html',
    styleUrls: ['./bper-card-skeleton.component.scss'],
})
export class BperCardSkeletonComponent {
    // payment | payment-small | conto | icon
    @Input() type: 'conto' | 'payment' | 'payment-small' = 'payment';
}
