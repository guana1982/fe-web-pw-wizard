import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'graphdata'
    // pure: false
})
@Injectable()
export class GraphDataPipe implements PipeTransform {
    constructor(private tr: TranslateService) {}
    transform(items: any, ...args: any[]) {
        return items.map(elem => ({
            descrizione: this.tr.instant(`PORTAFOGLIO.${elem.descrizione}`).toString().toUpperCase(),
            valore: elem.valore
        }));
    }
}
