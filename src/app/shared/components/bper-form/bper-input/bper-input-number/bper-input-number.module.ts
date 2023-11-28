import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { BperInputNumberComponent } from './component/bper-input-number.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidateInputModule } from '@shared/directives/validate-input/validate-input.module';

@NgModule({
    declarations: [BperInputNumberComponent],
    imports: [FormsModule, CommonModule, UiComponentsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ValidateInputModule],
    exports: [BperInputNumberComponent],
    providers: [CurrencyPipe, DecimalPipe]
})
export class BperInputNumberModule {}
