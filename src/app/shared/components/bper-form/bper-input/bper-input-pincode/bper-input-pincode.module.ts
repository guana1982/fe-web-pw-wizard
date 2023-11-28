import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BperInputPinCodeComponent } from './component/bper-input-pincode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';


@NgModule({
    declarations: [BperInputPinCodeComponent],
    imports: [FormsModule, CommonModule, UiComponentsModule, ReactiveFormsModule],
    exports: [BperInputPinCodeComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BperInputPinCodeModule {}
