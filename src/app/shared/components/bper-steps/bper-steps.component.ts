import { ViewportScroller } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { GenericObject } from '@shared/models/general.model';
import { BehaviorSubject, of } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { BperStep } from './bper-step.component';

@Component({
    selector: 'bper-steps',
    templateUrl: './bper-steps.component.html',
    styleUrls: ['./bper-steps.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class BperStepsComponent implements AfterViewInit {
    @Input() stepsTitle: string;
    @Input() hideStepsIndicator: boolean = false;
    @Input() hideTitle: boolean = false;
    /** Se true, il pulsante funzionerà da submit --> attualmente non funzionante */
    @Input() submit: boolean = false;
    @Input() columnGap: string;
    @Input() riba: boolean = false;

    @ViewChild('nextTooltip') nextTooltip;

    steps: BperStep[] = [];
    stepsNumber: number = 0;
    selectedStep: BperStep = null;
    canGoNext: boolean = true;
    canGoBack: boolean = true;
    private _stepIndex: number = 0;
    private _scrollPosition: GenericObject<[number, number]> = {};

    private _step = new BehaviorSubject(this._stepIndex);
    steps$ = this._step.asObservable().pipe(distinctUntilChanged());

    initialized = false;

    @ContentChildren(BperStep, { emitDistinctChangesOnly: true }) bSteps!: QueryList<BperStep>;

    ngAfterViewInit(): void {
        this._addSteps();
        this._initSteps();

        this.bSteps.changes.subscribe(_ => {
            this.steps = this.bSteps.toArray();
            this._setStepsVisibility();
        })
    }

    private _addSteps() {
        this.bSteps.map(step => {
            this.steps.push(step);
        })
    }

    public addStep(step: BperStep) {
        this.steps.push(step);
    }

    public onNext(evt) {
        // if( !this.canGoNext ) return;
        // this.canGoNext = false;
        const onNextCb$ = this.selectedStep.onNext ? this.selectedStep.onNext() : of(true);

        return onNextCb$
            .pipe(take(1))
            .subscribe(res => {
                if (!!res) {
                    this.goToStep(this._stepIndex + 1);
                }
                this.ee.markForCheck();
                // this.canGoNext = true;
            });
    }

    public onBack(evt) {
        if (!this.canGoBack) {
            return;
        }
        this.canGoBack = false;

        const onBackCb$ = this.selectedStep.onBack ? this.selectedStep.onBack() : of(true);

        return onBackCb$
            .pipe(take(1))
            .subscribe(res => {
                if (!!res) {
                    this.goToStep(this._stepIndex - 1);
                }
                this.canGoBack = true;
                this.ee.markForCheck();
            });
    }

    public goToStep(index: number) {
        this._stepIndex = Math.max(Math.min(index, this.stepsNumber - 1), 0);
        this._setStep(this._stepIndex);
    }

    resetStepper() {
        this._stepIndex = 0;
    }

    get currentStepNumber(): number {
        return this._stepIndex + 1;
    }

    get completion(): number {
        if (this.stepsNumber === 0) {
            return 0;
        }

        return Math.round(((this._stepIndex + 1) / this.stepsNumber) * 100);
    }

    private _initSteps() {
        this._stepIndex = 0;

        if (!this.steps) {
            throw new Error('Nessuno step trovato');
        }

        this._setStep(this._stepIndex);

        setTimeout(() => {
            this.initialized = true;
            this.ee.markForCheck();
        })
    }

    private _setStep(index) {
        this._step.next(index);
        this._vpScroller.scrollToPosition([0, 0]);

        this._setStepsVisibility(index);
    }

    private _setStepsVisibility(index = this._stepIndex) {
        this.stepsNumber = this.steps?.length || 0;

        index = Math.max(Math.min(index, this.stepsNumber - 1), 0);
        this.steps.sort((stepA, stepB) => stepA.order - stepB.order).forEach((step, idx) => {
            const isSelected = idx === index;
            step.setSelection(isSelected);
            if (isSelected) {
                this.selectedStep = step;
            }
        });
    }

    constructor(private ee: ChangeDetectorRef, private _vpScroller: ViewportScroller) { }
}
