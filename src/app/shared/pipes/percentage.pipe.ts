import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'percentage'
})
export class PercentagePipe implements PipeTransform {
    transform(value: number) {
        if (!!value || value === 0) {
            let pipedValue = value.toString();
            pipedValue = pipedValue.replace(/\./g, ',');
            return pipedValue + '%';
        }
        return '';
    }
}
