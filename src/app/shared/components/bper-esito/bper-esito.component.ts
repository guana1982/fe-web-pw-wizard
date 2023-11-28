import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export type EsitiTypes =
    | 'success'
    | 'success-primary-600'
    | 'error'
    | 'warning'
    | 'info'
    | 'info-green'
    | 'waiting'
    | 'warning-gradient'
    | 'donazioni'
    | 'polizze'
    | 'error-generic'
    | 'image';

@Component({
    selector: 'bper-esito',
    templateUrl: './bper-esito.component.html',
    styleUrls: ['./bper-esito.component.scss']
})
export class BperEsitoComponent implements OnChanges {
    @Input() type: EsitiTypes = 'success';
    @Input() imageUrl;
    @Input() title: string = '';
    @Input() titleHTML: string = null;
    @Input() description: string = '';
    @Input() descriptionHTML: string = null;
    @Input() whiteSpace: boolean = false;

    iconClass: string;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        const { type } = changes;

        if (type) this.iconClass = this.getIconClass();
    }

    public getIconClass() {
        switch (this.type) {
            case 'success':
                return 'bper-ic-96px-circle-check';
            case 'success-primary-600':
                return 'bper-ic-96px-circle-check';
            case 'error':
                return 'bper-ic-96px-exclamation-point-2';
            case 'warning':
                return 'bper-ic-96px-exclamation-point';
            case 'warning-gradient':
                return 'bper-ic-96px-exclamation-point';
            case 'info':
                return 'bper-ic-96px-info';
            case 'info-green':
                return 'bper-ic-96px-info';
            case 'waiting':
                return 'bper-ic-96px-clock';
            case 'donazioni':
                return 'bper-ic-96px-heart-check';
            case 'polizze':
                return 'bper-ic-96px-clock';
            case 'error-generic':
                return 'bper-ic-96px-exclamation-point-2';
        }
    }

    public get isError(): boolean {
        return this.type === 'error';
    }
}
