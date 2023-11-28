import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bper-line-skeleton',
    template: `<div *ngFor="let i of counter(lines); let it = index">
                  <div class="bper-line-skeleton --{{position}}" 
                  [style.width]="width"  [style.background]="background"
                  [style.height]="height" [style.position]="position">
                     <div class="skeleton-animation"></div>
                  </div>
                </div>`,
    styleUrls: ['./bper-line-skeleton.component.scss'],
})
export class BperLineSkeletonComponent implements OnInit {
    // # of Lines
    @Input() lines: number;
    @Input() width: string = 'auto';
    @Input() height: string = '15';
    // left \ right
    @Input() position: string = 'left';
    @Input() background: string = '#e1eded';

    ngOnInit(): void {
        (Number(this.width)) ? this.width = this.width + 'px' : (!this.width ? this.width = 'auto' : this.width);
        (Number(this.height)) ? this.height = this.height + 'px' : this.height = 'auto';
    }
    counter(length: number): Array<any> {
        if (length >= 0) {
            return new Array(length);
        }
    }
}
