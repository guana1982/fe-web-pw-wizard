import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BperInputTextComponent } from './component/bper-input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ValidateInputModule } from '@shared/directives/validate-input/validate-input.module';

@NgModule({
    declarations: [BperInputTextComponent],
    imports: [CommonModule, FormsModule, UiComponentsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ValidateInputModule],
    exports: [BperInputTextComponent]
})
export class BperInputTextModule {}
