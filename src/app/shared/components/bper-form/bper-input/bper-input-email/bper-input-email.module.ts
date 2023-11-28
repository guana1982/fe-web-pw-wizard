import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BperInputEmailComponent } from './component/bper-input-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [FormsModule, CommonModule, UiComponentsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    declarations: [BperInputEmailComponent],
    exports: [BperInputEmailComponent]
})
export class BperInputEmailModule {}
