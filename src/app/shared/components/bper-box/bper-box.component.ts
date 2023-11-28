import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

type dimensionType = 'hero' | 'image' | 'large';
type ctaType = 'primary' | 'secondary-accent' | 'secondary-white' | 'ghost-accent' | 'ghost-white';

@Component({
    selector: 'bper-box',
    templateUrl: './bper-box.component.html',
    styleUrls: ['./bper-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BperBoxComponent implements OnInit {
    @Input() dimension: dimensionType = 'image';
    @Input() iconTopLeft: string;
    @Input() iconTopRight: string;
    @Input() tag: string;
    @Input() date: string;
    @Input() category: string;
    @Input() title: string;
    @Input() label: string;
    @Input() cta: ctaType;
    @Input() ctaLabel: string;
    @Input() ctaIcon: string;

    constructor() {}

    ngOnInit(): void {}
}
