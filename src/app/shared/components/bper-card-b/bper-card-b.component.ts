import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'bper-card-b',
    templateUrl: './bper-card-b.component.html',
    styleUrls: ['./bper-card-b.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperCardBComponent {
    @Input() amountDescription: string;
    @Input() amountValue: number;
    @Input() cardSubtitle: string;
    @Input() cardTitle: string;
    @Input() favourite: boolean = false;
    @Input() isLoading: boolean = false;
    @Input() pointerZone: 'ctaOnly' | 'full' = 'ctaOnly';
    @Input() tag: {color: string, label: string};
    @Input() width: 'large' | 'small' | 'full' = 'full';

    @Output() clickCard: EventEmitter<null> = new EventEmitter();
    @Output() clickCta: EventEmitter<null> = new EventEmitter();

    onClickCard() { this.clickCard.emit() }
    onClickCta() { this.clickCta.emit() }
}
