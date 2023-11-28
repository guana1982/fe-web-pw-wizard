import { Component, Input, ViewEncapsulation } from '@angular/core';
import SwiperCore, { SwiperOptions, Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
    selector: 'bper-carousel',
    templateUrl: './bper-carousel.component.html',
    styleUrls: ['./bper-carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BperCarouselComponent {
    @Input() data;
    @Input() isAmazon: boolean = false;

    config: SwiperOptions = {
        spaceBetween: 31,
        navigation: {
            prevEl: '.bper-c-carousel__btnPrev',
            nextEl: '.bper-c-carousel__btnNext'
        },
        pagination: { clickable: true },
        watchSlidesVisibility: true,
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 2
            },
            0: {
                slidesPerView: 1
            }
        }
    };

    constructor() {}

    ngOnInit(): void {}
}
