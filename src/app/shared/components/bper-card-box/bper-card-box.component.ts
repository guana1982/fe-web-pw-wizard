import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'bper-card-box',
  templateUrl: './bper-card-box.component.html',
  styleUrls: ['./bper-card-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperCardBoxComponent {
    @Input() cardType: 'shortcutIcon' | 'shortcutIcon2' | 'product' = 'product';
    @Input() imageUrl: string;
    @Input() cardTitle: string;
    @Input() subtitle: string;
    @Input() ctaIcon: string;
    @Input() ctaLabel: string;
    @Input() titleIcon: string;
    // "True" se il testo che arriva da CMS è troppo lungo e si sovrappone all'icona (compromettendone la leggibilità)
    @Input() customContentWidth: boolean = false;
    @Input() marginBottom: string;
    @Input() customStyle: 'homepage';

    @Output() public clickCard: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() public ctaClick: EventEmitter<MouseEvent> = new EventEmitter();

    public onCardClick(event: MouseEvent) {
      event.stopPropagation();
      this.clickCard.emit(event);
    }

    public btnClick(event: MouseEvent) {
      this.ctaClick.emit(event);
    }
}
