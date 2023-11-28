import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArkWarningStripComponent } from './component/ark-warning-strip.component';
import { ArkWarningStripService } from './service/ark-warning-strip.service';

@NgModule({
    imports: [CommonModule],
    declarations: [ArkWarningStripComponent],
    exports: [ArkWarningStripComponent]
})
export class ArkWarningStripModule {}
