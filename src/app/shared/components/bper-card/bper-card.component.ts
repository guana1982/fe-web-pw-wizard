import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'bper-card',
    templateUrl: './bper-card.component.html',
    styleUrls: ['./bper-card.component.scss']
})
export class BperCardComponent implements OnInit, OnChanges {
    @ViewChild('matCardContent') matCardContent?: ElementRef;
    @Input() cardType: 'horizontalCard' | 'radioCard' | 'genericCard' | 'iconCard' = 'genericCard';

    // Generica
    @Input() icon: string;
    @Input() image: string;
    @Input() title: string;
    @Input() boldTitle: string;
    @Input() subtitle: string;
    @Input() description: string;
    @Input() disabled = false;
    @Input() isSelected: boolean = false;
    @Input() ctaLabel: string = 'Vedi codice';
    @Input() ctaIcon: string = 'eye-open';
    @Input() size: 'big' | 'small' = 'big';
    @Input() usePointer: boolean = true;
    @Input() paddingCard: string;
    @Input() sizeLabel: string;

    @Output() public clickCard: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() public clickBtn: EventEmitter<MouseEvent> = new EventEmitter();

    cardClass = {};
    radioFormGroup = new UntypedFormGroup({
        radioFormControl: new UntypedFormControl()
    });

    constructor() {}

    ngOnInit(): void {
        this.cardClass = {
            'horizontal-card': this.cardType === 'horizontalCard',
            'radio-card': this.cardType === 'radioCard',
            'icon-card': this.cardType === 'iconCard'
        };

        if (this.isSelected) {
            this.radioFormGroup.patchValue({
                radioFormControl: this.title
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.isSelected) {
            this.isSelected = changes.isSelected.currentValue;

            if (this.isSelected) {
                this.radioFormGroup.patchValue({
                    radioFormControl: this.title
                });
            }
        }
    }

    public onCardClick(event: MouseEvent) {
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.clickCard.emit(event);
    }

    public onClickBtn(event: MouseEvent) {
        this.clickBtn.emit(event);
    }
}
