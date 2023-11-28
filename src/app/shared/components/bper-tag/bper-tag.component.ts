import { Component, OnInit, Input } from '@angular/core';

export enum TagColor {
    NEUTRAL = 'neutral',
    GREEN = 'green',
    RED = 'red',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREY = 'grey',
    NEW = 'new',
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning'
}

@Component({
    selector: 'bper-tag',
    templateUrl: './bper-tag.component.html',
    styleUrls: ['./bper-tag.component.scss']
})
export class BperTagComponent implements OnInit {
    @Input() pill: boolean;
    @Input() color: TagColor = TagColor.NEUTRAL;
    @Input() backgroundColorCode: string;
    @Input() colorCode: string;
    @Input() label: string = '';
    @Input() labelHTML: string;
    @Input() transformText: 'uppercase' | 'capitalize' | 'none' = 'none';

    actualLabel: string;

    public tagClasses = [];

    constructor() {}

    ngOnInit(): void {
        this.tagClasses.push(this.color);
        if (this.pill) {
            this.tagClasses.push('pill');
        }

        this.actualLabel = this.labelHTML ? this.labelHTML : this._transformLabel(this.label);
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
