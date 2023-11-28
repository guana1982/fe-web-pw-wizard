import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CardActions, CardCategory, CardDetailsV2, CardState } from "@bper/npm-core/products";
import { resolveCardArt } from './bper-card.map';

@Component({
    selector: 'bper-card-payment',
    templateUrl: './bper-card-payment.component.html',
    styleUrls: ['./bper-card-payment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperCardPaymentComponent {
    @Input() actions: CardActions;
    @Input() size: 'detail' | 'large' | 'small' | 'selection' | 'homepage' = 'large';
    @Input() isNew: boolean = false;
    @Input() category: CardCategory;
    @Input() preferred: boolean = false;
    @Input() availability: number | 'N.a.';
    @Input() currency: string = 'EUR';
    @Input() image: string;
    @Input() name: string;
    @Input() number: string;
    @Input() isSelected: boolean = false;
    @Input() state: string;
    @Input() isLoading: boolean = false;
    @Input() hideAvailability: boolean = false;
    @Input() circuit: 'MASTERCARD' | 'VISA';
    @Input() productCode: string;
    @Input('card-info') cardInfo: CardDetailsV2;
    @Input() cursor: 'default' | 'pointer';
    @Input() noSelection: boolean;

    @Output() public clickCard: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() public clickArrow: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() public clickFavourite: EventEmitter<MouseEvent> = new EventEmitter();

    get cardState() {
        if (this.actions?.toActivate) {
            return {
                label: 'Da attivare',
                color: 'yellow'
            }
        }

        if (this.actions?.toRenew) {
            return {
                label: 'In rinnovo',
                color: 'yellow'
            }
        }

        if (this.state === CardState.ValueEnum.BLOCCATA) {
            return {
                label: 'Bloccata',
                color: 'red'
            }
        }
    }

    get cardClasses() {
        return {
            'detail': ['detail', 'selection'].includes(this.size),
            'large': ['homepage', 'large'].includes(this.size),
            'small': this.size === 'small',
            'homepage': this.size === 'homepage',
            'blocked': this.state === CardState.ValueEnum.BLOCCATA,
        }
    }

    onClickArrow($event) {
        this.clickArrow.emit($event)
    }

    onClickCard($event) {
        this.clickCard.emit($event)
    }

    onClickFavourite($event) {
        this.clickFavourite.emit($event)
    }

    public getCardArt(circuit, productCode) {
        const extras = { expiryDate: this.cardInfo?.expiryDate, abi: this.cardInfo?.linkedAccountCode?.accountId?.abi };
        return resolveCardArt(circuit, productCode, extras);
    }

    isBlocked() {
        return this.state === 'BLOCCATA';
    }
}
