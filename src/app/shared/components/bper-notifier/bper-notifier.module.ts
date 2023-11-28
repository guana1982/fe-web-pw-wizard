import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { BperNotifierComponent } from './component/bper-notifier.component';
import { BperNotifierTemplateComponent } from './component/bper-notifier-template/bper-notifier-template.component';

const notifierConfig: NotifierOptions = {
    theme: 'ubi',
    position: {
        horizontal: {
            position: 'right' // right: 12px
        },
        vertical: {
            position: 'bottom' // right: 12px
        }
    },
    behaviour: {
        autoHide: false,
        onClick: 'hide'
    }
};

@NgModule({
    imports: [CommonModule, NotifierModule.withConfig(notifierConfig)],
    declarations: [BperNotifierComponent, BperNotifierTemplateComponent],

    exports: [BperNotifierComponent]
})
export class BperNotifierModule {}
