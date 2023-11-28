import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BperInputPasswordComponent } from './component/bper-input-password.component';

@NgModule({
    imports: [FormsModule, CommonModule, UiComponentsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
    declarations: [BperInputPasswordComponent],
    exports: [BperInputPasswordComponent],
    providers: [CurrencyPipe, DecimalPipe]
})
export class BperInputPasswordModule {}
