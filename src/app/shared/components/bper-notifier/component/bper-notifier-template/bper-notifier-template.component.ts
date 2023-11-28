import { Component, AfterViewInit, Input, EventEmitter, ViewChild, TemplateRef } from '@angular/core';

import { uniqueId } from 'lodash-es';

@Component({
    selector: 'bper-notifier-template',
    templateUrl: './bper-notifier-template.component.html'
})
export class BperNotifierTemplateComponent implements AfterViewInit {
    public readonly id = 'bperNotifierTemplate' + uniqueId();

    @Input() title: string;
    @Input() message: string;
    @Input() subMessage?: string;
    @Input() iconInput = ''; // tutte le icone utilizzate nel progetto
    @Input() iconLeft? = '';
    @Input() close: boolean;

    emitTemplateRef: EventEmitter<any> = new EventEmitter();

    @ViewChild('template') templateRef: TemplateRef<any>;

    constructor() {}

    ngAfterViewInit() {
        this.emitTemplateRef.emit(this.templateRef);
    }

    /**
     * fired by the click on the "dismiss" button
     * this empty method will be overwritten by BperNotifierComponent
     */
    public onClose() {}
}
