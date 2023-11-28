import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { ValidateInputModule } from '@shared/directives/validate-input/validate-input.module';
import { BperInputGenericsComponent } from './component/bper-input-generics.component';

@NgModule({
    declarations: [BperInputGenericsComponent],
    imports: [CommonModule, FormsModule, UiComponentsModule, MatFormFieldModule, MatInputModule, ValidateInputModule],
    exports: [BperInputGenericsComponent]
})
export class BperInputGenericsModule {}
