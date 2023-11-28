import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bper-carousel-slide',
    templateUrl: './bper-carousel-slide.component.html',
    styleUrls: ['./bper-carousel-slide.component.scss'],
})
export class BperCarouselSlideComponent {
    @Input() slide;
    @Input() isAmazonSlider: boolean = false;
    
    constructor(private _router: Router) { 
    }
    
    goTo(link: string) {
        return window.location.href = link;
    }

}
