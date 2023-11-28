import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bper-image-skeleton',
    template: `<div>
                  <div class="bper-image-skeleton --{{position}}" 
                  [style.width]="width"  [style.background]="background"
                  [style.height]="height" [style.position]="position" [style.borderRadius]="radius +'px'">
                     <div class="skeleton-animation"></div>
                  </div>
                </div>`,
    styleUrls: ['./bper-image-skeleton.component.scss'],
})
export class BperImageSkeletonComponent implements OnInit {
    // # of Lines
    @Input() width: string = '100';
    @Input() height: string = '100';
    // left | right | auto
    @Input() position: string = 'left';
    @Input() background: string = '#e1eded';
    @Input() radius: string = '12';

    ngOnInit(): void {
        (Number(this.width)) ? this.width = this.width + 'px' : this.width = 'auto';
        (Number(this.height)) ? this.height = this.height + 'px' : this.height = 'auto';
    }
}
