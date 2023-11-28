import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StepService } from '../../services/step.services';
import { LoaderService } from '@bper/npm-core/utilities/loader';
import { UserDataService } from '../../services/user-data.service';

@Component({
    selector: 'pw-step-introduzione',
    templateUrl: './pw-step-introduzione.component.html',
    styleUrls: ['./pw-step-introduzione.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PwStepIntroduzioneComponent {
    @Input() nomeUtente: any;
    @Output() public clickCard: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() public ctaClick: EventEmitter<MouseEvent> = new EventEmitter();
    public marginBottom: string = '25px';
    cardType: 'shortcutIcon' | 'shortcutIcon2' | 'product' = 'product';
    imageUrl: string;
    cardTitle: string;
    subtitle: string;
    ctaIcon: string;
    ctaLabel: string;
    titleIcon: string;
    // "True" se il testo che arriva da CMS è troppo lungo e si sovrappone all'icona (compromettendone la leggibilità)
    customContentWidth: boolean = false;
    // marginBottom: string;
    customStyle: 'homepage';

    constructor(
        private stepService: StepService,
        private _loaderService: LoaderService,
        public userDataService: UserDataService
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    public onCardClick(event: MouseEvent) {
        event.stopPropagation();
        this.clickCard.emit(event);
    }

    public btnClick(event: MouseEvent) {
        this.ctaClick.emit(event);
    }

    goToNextStep(): void {
        // this._loaderService.loading();
        this.stepService.goToNextStep();
    }
}
