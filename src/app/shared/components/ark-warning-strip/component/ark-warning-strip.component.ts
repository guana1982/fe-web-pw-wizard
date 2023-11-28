import { AnimationEvent } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { showHideAnimation } from '@shared/utils/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArkWarningStripAction, ArkWarningStripPayload, ArkWarningStripService } from '../service/ark-warning-strip.service';

@Component({
    selector: 'ark-warning-strip',
    templateUrl: './ark-warning-strip.component.html',
    styleUrls: ['./ark-warning-strip.component.scss'],
    animations: [showHideAnimation]
})
export class ArkWarningStripComponent implements OnInit, OnDestroy {
    constructor(private warningStripService: ArkWarningStripService) {}

    private unsub$ = new Subject();

    private showActionsQueue: ArkWarningStripAction[] = [];
    public showStrip = false;

    private titleDefault = 'WARNING';
    public title: string;
    public message: string;

    ngOnInit() {
        // subscribe to actions from ArkNotifierService
        this.warningStripService.actionsStream.pipe(takeUntil(this.unsub$)).subscribe((action: ArkWarningStripAction) => {
            this.handleAction(action);
        });
    }

    /**
     * handle the action emitted from warningStripService.actionsStream
     * call the appropriate method
     * @param {ArkWarningStripAction} action
     */
    private handleAction(action: ArkWarningStripAction) {
        switch (action.type) {
            case this.warningStripService.actionType.SHOW: {
                // add the action to showActionsQueue
                this.showActionsQueue.push(action);

                // if there isn't another strip visible,
                // check showActionsQueue for an action to handle
                // else do nothing else
                if (!this.showStrip) {
                    this.checkShowActionsQueue();
                }
                return;
            }
            case this.warningStripService.actionType.HIDE:
                return this.handleHideAction();
            case this.warningStripService.actionType.HIDE_ALL:
                return this.handleHideAllAction();
        }
    }

    /**
     * check showActionsQueue for a show action to handle
     * only display a new strip if there is a show action in the queue
     * and if there isn't another strip being shown
     */
    checkShowActionsQueue() {
        if (this.showActionsQueue.length === 0 || this.showStrip) {
            return;
        }
        // get the first action in the queue and remove it from the queue
        const currentAction: ArkWarningStripAction = this.showActionsQueue.shift();
        // handle the action
        this.handleShowAction(currentAction.payload);
    }

    /**
     * handle a warningStripService.actionType.SHOW action
     * set the title and the message, and show the strip
     * @param {ArkNotifierPayload} payload
     */
    private handleShowAction(payload: ArkWarningStripPayload) {
        this.title = payload.title || this.titleDefault;
        this.message = payload.message;
        this.showStrip = true;
    }

    /**
     * handle a warningStripService.actionType.HIDE action
     * hide the current strip
     */
    private handleHideAction() {
        this.hideStrip();
    }

    /**
     * handle a warningStripService.actionType.HIDE_ALL action
     * hide the current strip and empty showActionsQueue
     */
    private handleHideAllAction() {
        this.showActionsQueue = [];
        this.hideStrip();
    }

    /**
     * hide the strip
     */
    hideStrip() {
        this.showStrip = false;
    }

    /**
     * function fired after an animation is finished
     * if it's a closing animation,
     * check showActionsQueue for a show action to handle
     * @param {AnimationEvent} event
     */
    onAnimationEnd(event: AnimationEvent) {
        // if it's a closing animation
        if (event.toState === 'void') {
            this.checkShowActionsQueue();
        }
    }

    ngOnDestroy() {
        // unsubscribe
        this.unsub$.next();
        this.unsub$.complete();
    }
}
