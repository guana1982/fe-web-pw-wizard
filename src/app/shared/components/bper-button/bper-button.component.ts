import {Component, OnInit, Input, Output, EventEmitter, HostBinding} from '@angular/core';

@Component({
    selector: 'bper-button',
    templateUrl: './bper-button.component.html',
    styleUrls: ['./bper-button.component.scss']
})
export class BperButtonComponent implements OnInit {
    /** Utilizzato per definire il type del btn. Valore di Default è false.
     *  Se isSubmit è true, alla pressione su enter, questo button sarà quello cliccato.
     *  NON ABUSARNE TROPPO
     */
    @Input() isSubmit: boolean = false;
    @Input() buttonType: 'button' | 'icon-left' | 'icon-right' | 'fab' = 'button'; // button, icon-left, icon-right, fab
    // tslint:disable-next-line:max-line-length
    @Input() order: 'primary' | 'secondary-accent' | 'secondary-white' | 'ghost-accent' | 'ghost-white' | 'ghost-green' = 'primary';
    @Input() priority = false;
    @Input() textSize = '16px';
    @Input() fabSize = '48px';
    @Input() iconSize = '16px';
    @Input() iconColor?: 'primary' | 'accent' | 'white'; // verde, arancione, bianco
    @Input() inline = false;
    @Input() disabled = false;
    // tslint:disable-next-line:no-input-rename
    @Input('icon') iconInput = ''; // tutte le icone utilizzate nel progetto
    @Input() label = '';
    @Input() thin = true;
    @Input() stopPropagation = true;
    @Input() squared = false;
    @Input() transformText: 'uppercase' | 'capitalize' | 'none' = 'none';
    @Input() rotateIcon: number = 0;
    @Input() fontFamily: string;
    @Input() breakLine: boolean = false; // Permette al testo di spezzarsi e andare a capo.

    @Output() public clickBtn: EventEmitter<MouseEvent> = new EventEmitter();

    get icon() {
        return this.iconInput ? `bper-ic-${this.iconInput}` : '';
    }

    @HostBinding('class') classes;
    public buttonClass = {};

    constructor() {}

    ngOnInit(): void {
        this.buttonClass = {
            primary: this.order === 'primary',
            "secondary-accent": this.order === 'secondary-accent',
            "secondary-white": this.order === 'secondary-white',
            "ghost-accent": this.order === 'ghost-accent',
            "ghost-white": this.order === 'ghost-white',
            "ghost-green": this.order === 'ghost-green',
            priority: this.order === 'primary' && this.priority,
            "with-icon": this.buttonType !== 'fab' && this.iconInput !== '',
            squared: this.squared,
            thin: this.thin,
            'break-line': this.breakLine
        };

        this.classes = ['wrapper-' + this.order];
        this.inline && this.classes.push('wrapper-inline');

        this.label = this._transformLabel(this.label);
    }

    public onButtonClick(event: MouseEvent) {
        this.stopPropagation && event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.clickBtn.emit(event);
    }

    public onElementClick(event: MouseEvent) {
        if (!this.stopPropagation) return; // C'è già il onButtonClick

        event.stopPropagation();
        if (!this.disabled) {
            this.clickBtn.emit(event);
        }
    }

    private _transformLabel(label: string): string {
        if (this.transformText === 'uppercase') {
            return label.toLocaleUpperCase();
        } else if (this.transformText === 'capitalize') {
            return label
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        } else {
            return label;
        }
    }
}
