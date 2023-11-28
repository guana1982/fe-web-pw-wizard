import {
    Component,
    OnInit,
    ViewChild,
    TemplateRef,
    OnDestroy,
    ViewContainerRef,
    ComponentRef,
    ComponentFactoryResolver,
    ComponentFactory
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { NotifierService, NotifierContainerComponent } from 'angular-notifier';
import { BperNotifierService, BperNotifierPayload, BperNotifierAction } from '../service/bper-notifier.service';
import { BperNotifierTemplateComponent } from './bper-notifier-template/bper-notifier-template.component';

@Component({
    selector: 'bper-notifier',
    templateUrl: './bper-notifier.component.html'
    // styleUrls: ['./bper-notifier.component.scss'],
})
export class BperNotifierComponent implements OnInit, OnDestroy {
    constructor(
        private bperNotifier: BperNotifierService,
        private notifier: NotifierService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    private unsub$ = new Subject();
    // factory used to create instances of BperNotifierTemplateComponent
    private templateComponentFactory: ComponentFactory<BperNotifierTemplateComponent>;

    // ViewContainerRef that will create an instance of BperNotifierTemplateComponent
    @ViewChild('templateContainer', { read: ViewContainerRef }) templateContainerRef: ViewContainerRef;

    @ViewChild(NotifierContainerComponent) notifierContainerRef: NotifierContainerComponent;

    ngOnInit() {
        // subscribe to actions from BperNotifierService
        this.bperNotifier.actionsStream.pipe(takeUntil(this.unsub$)).subscribe((action: BperNotifierAction) => {
            this.handleAction(action);
        });

        this.templateComponentFactory = this.componentFactoryResolver.resolveComponentFactory(BperNotifierTemplateComponent);
    }

    /**
     * handle the action emitted from bperNotifier.actionsStream
     * call the appropriate method
     * @param {BperNotifierAction} action
     */
    private handleAction(action: BperNotifierAction) {
        switch (action.type) {
            case this.bperNotifier.actionType.SHOW:
                return this.handleShowAction(action.payload);
            case this.bperNotifier.actionType.SHOW_SMALL:
                return this.handleShowSmallAction(action.payload);
            case this.bperNotifier.actionType.HIDE_ALL:
                return this.handleHideAllAction();
        }
    }

    /**
     * handle a bperNotifier.actionType.SHOW action
     * call notifier.show passing the template
     *
     * a new BperNotifierTemplateComponent is created every time,
     * and it emits the TemplateRef
     *
     * reason: the template is passed to notifier.show by reference,
     * it's necessary to create a new template every time
     * @param {BperNotifierPayload} payload
     */
    private handleShowAction(payload: BperNotifierPayload) {
        const { type, title, message, subMessage, iconLeft, close } = payload;
        // create a new BperNotifierTemplateComponent
        const componentRef: ComponentRef<BperNotifierTemplateComponent> = this.createTemplateComponent(
            title,
            message,
            subMessage,
            iconLeft,
            close
        );
        // internal id of the created component
        const id = componentRef.instance.id;

        // the TemplateRef of the created component will be emitted by emitTemplateRef
        componentRef.instance.emitTemplateRef.pipe(take(1)).subscribe((template: TemplateRef<any>) => {
            this.notifier.show({
                type,
                id,
                message,
                template
            });
        });
    }

    /**
     * handle a bperNotifier.actionType.SHOW_SMALL action
     * call notifier.show with only a message
     * @param {BperNotifierPayload} payload
     */
    private handleShowSmallAction(payload: BperNotifierPayload) {
        this.notifier.show({
            type: payload.type,
            message: payload.message
        });
    }

    /**
     * handle a bperNotifier.actionType.HIDE_ALL action
     * call notifier.hideAll
     * @param {BperNotifierPayload} payload
     */
    private handleHideAllAction() {
        this.notifier.hideAll();
    }

    /**
     * create a new BperNotifierTemplateComponent
     * and set its inputs and onClose method
     * return the ComponentRef of the created component
     * @param {string} title
     * @param {string} message
     * @param {string} subMessage
     *
     * @returns {ComponentRef<BperNotifierTemplateComponent>}
     */
    createTemplateComponent(
        title: string,
        message: string,
        subMessage: string,
        iconLeft?: string,
        close?: boolean
    ): ComponentRef<BperNotifierTemplateComponent> {
        // remove previous template
        this.templateContainerRef.clear();
        // create a new BperNotifierTemplateComponent with templateContainerRef using templateComponentFactory
        const componentRef: ComponentRef<BperNotifierTemplateComponent> = this.templateContainerRef.createComponent(
            this.templateComponentFactory
        );
        // set the inputs of the created BperNotifierTemplateComponent
        componentRef.instance.title = title;
        componentRef.instance.message = message;
        componentRef.instance.subMessage = subMessage;
        componentRef.instance.iconLeft = iconLeft;
        componentRef.instance.close = close;
        // overwrite the onClose method of BperNotifierTemplateComponent
        // NB: it must use either an arrow function or .bind(this)
        componentRef.instance.onClose = () => {
            this.notifier.hide(componentRef.instance.id);
        };

        return componentRef;
    }

    ngOnDestroy() {
        // unsubscribe
        this.unsub$.next();
        this.unsub$.complete();
    }
}
