import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'bper-card-firma',
    templateUrl: './bper-card-firma.component.html',
    styleUrls: ['./bper-card-firma.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class BperCardFirmaComponent implements OnInit {
    @ViewChild('matCardContent') matCardContent?: ElementRef;

    // Generica
    // @Input() icon: string;
    // @Input() image: string;
    // @Input() title: string;
    // @Input() boldTitle: string;
    // @Input() subtitle: string;
    // @Input() description: string;
    // @Input() disabled = false;
    // @Input() isSelected: boolean = false;
    // @Input() ctaLabel: string = 'Vedi codice';
    // @Input() ctaIcon: string = 'eye-open';

    // @Output() public clickCard: EventEmitter<MouseEvent> = new EventEmitter();

    @Output() public clickBtn: EventEmitter<MouseEvent> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    public onClickBtn(event: MouseEvent) {
        this.clickBtn.emit(event);
    }
}
