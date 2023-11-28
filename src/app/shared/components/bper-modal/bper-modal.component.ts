import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, shareReplay, startWith, tap, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'bper-modal',
    templateUrl: './bper-modal.component.html',
    styleUrls: ['./bper-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class BperModalComponent implements AfterViewChecked, OnDestroy, OnInit {
    // tslint:disable-next-line: no-input-rename
    @Input('modal-title') modalTitle: string;
    @Input() id: string = '';
    @Input() noTitle: boolean = false;
    @Input() hasLeftImage: boolean = false;
    @Input() noActions: boolean = false;
    @Input() imageSrc: string = '';
    @Input() overflow: string;
    @Input() noHeader: string;

    @Input() noCloseButton: boolean = false;

    // Gestione fading on overlay
    @ViewChild('matDialogContent') matDialogContent;
    @Input() enableFadeOverlay: boolean = true;
    private _scrollableChild;

    private _showFadeOverlay: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private cdr: ChangeDetectorRef,
        public dialogRef: MatDialogRef<BperModalComponent>
    ) { }
    
    showFadeOverlay$: Observable<boolean> = this._showFadeOverlay.asObservable().pipe(
        distinctUntilChanged(),
        tap(() => setTimeout(() => this.cdr.detectChanges(), 0))
    );

    private _checkScrollSub: Subscription;
    private _checkScroll: BehaviorSubject<null> = new BehaviorSubject(null);
    private _checkScroll$: Observable<null> = this._checkScroll.asObservable().pipe(
        filter(() => this.enableFadeOverlay),
        shareReplay()
    );
    private _checkScrollFiltered$: Observable<any> = combineLatest([
        this._checkScroll$.pipe(debounceTime(300), startWith<null, null>(null)),
        this._checkScroll$.pipe(throttleTime(3000), startWith<null, null>(null))
    ]);

    @HostListener('window:resize') onResize() {
        this._checkScroll.next(null);
    }

    ngOnDestroy() {
        this._checkScrollSub?.unsubscribe();
    }

    ngOnInit() {
        this._checkScrollSub = this._checkScrollFiltered$.subscribe(() => this._checkIfScrollable());
    }

    ngAfterViewChecked() {
        this._checkScroll.next(null);
    }

    private _checkIfScrollable() {
        this._resetCurrentChild();
        if (!this.enableFadeOverlay) return;

        const nativeElement = this.matDialogContent?.nativeElement;
        this._scrollableChild = this._findChild([nativeElement], nativeElement?.clientHeight);

        if (this._scrollableChild) {
            this._showFadeOverlay.next(!(this._scrollableChild.scrollTop + this._scrollableChild.offsetHeight + 5 >= this._scrollableChild.scrollHeight));
            this._setOnScrollListener(this._scrollableChild);
        } else {
            this._showFadeOverlay.next(false);
        }
    }


    private _findChild(elements: any[], height: number, depth: number = 3, tolerance: number = 5) {
        // Caso base negativo
        if (!elements) {
            return;
        }

        elements = Array.from(elements);

        for (let element of elements) {
            // Caso base positivo
            if (element && (element.clientHeight < (element.scrollHeight - tolerance))) {
                return element;
            }
        }

        // Caso ricorsivo limitato in profondità
        if (depth > 0) {
            for (let element of elements) {
                if (!!element && window.getComputedStyle(element)?.overflowY == 'auto') {
                    const x = this._findChild(element?.children, height, depth - 1);

                    if (x) {
                        return x;
                    }
                }
            }
        }

        // Caso negativo
        return;
    }

    private _setOnScrollListener(element: any) {
        element.onscroll = () => {
            this._showFadeOverlay.next(!(this._scrollableChild.scrollTop + this._scrollableChild.offsetHeight + 5 >= this._scrollableChild.scrollHeight));
        }
    }

    private _resetCurrentChild() {
        if (!this._scrollableChild) return;
        this._scrollableChild.onscroll = null;
        this._scrollableChild = null;
    }

    closeModal() {
        this.dialogRef.close({ action: 'close', data: null });
    }
}
