import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BperInputCfpiComponent } from './component/bper-input-cfpi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [BperInputCfpiComponent],
    imports: [FormsModule, CommonModule, UiComponentsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
    exports: [BperInputCfpiComponent]
})
export class BperInputCfpiModule {}
