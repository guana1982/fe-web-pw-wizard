import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { BperInputCurrencyComponent } from './component/bper-input-currency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ValidateInputModule } from '@shared/directives/validate-input/validate-input.module';

@NgModule({
    declarations: [BperInputCurrencyComponent],
    imports: [FormsModule, CommonModule, UiComponentsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ValidateInputModule],
    providers: [CurrencyPipe, DecimalPipe],
    exports: [BperInputCurrencyComponent]
})
export class BperInputCurrencyModule {}
