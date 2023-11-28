import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BperInputIbanComponent } from './component/bper-input-iban.component';
import { ValidateInputModule } from '@shared/directives/validate-input/validate-input.module';
import { BperInputTooltipModule } from '@shared/components/bper-tool-tip/bper-tool-tip.modules';

@NgModule({
    declarations: [BperInputIbanComponent],
    imports: [FormsModule, CommonModule, UiComponentsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ValidateInputModule, BperInputTooltipModule],
    exports: [BperInputIbanComponent]
})
export class BperInputIbanModule {}
