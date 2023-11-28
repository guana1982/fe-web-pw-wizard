import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BperRadioComponent } from './component/bper-radio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [BperRadioComponent],
    imports: [CommonModule, FormsModule, UiComponentsModule, ReactiveFormsModule, MatRadioModule, MatSelectModule],
    exports: [BperRadioComponent]
})
export class BperRadioModule {}
