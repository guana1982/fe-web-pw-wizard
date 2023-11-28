import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BperSearchOutlineComponent } from './component/bper-search-outline.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponentsModule } from '@core/modules/ui-components/ui-components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [BperSearchOutlineComponent],
    imports: [CommonModule, FormsModule, UiComponentsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
    exports: [BperSearchOutlineComponent]
})
export class BperSearchOutlineModule {}
