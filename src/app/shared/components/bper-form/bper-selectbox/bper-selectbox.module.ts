import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BperSelectboxComponent } from './component/bper-selectbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [BperSelectboxComponent],
    imports: [CommonModule, FormsModule, UiComponentsModule, MatOptionModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
    exports: [BperSelectboxComponent]
})
export class BperSelectboxModule {}
