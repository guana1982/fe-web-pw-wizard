import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateText'
})
@Injectable()
export class TruncateText implements PipeTransform {
    transform(value: string, limit = 25, completeWords = false, ellipsis = '...', tool: false = false) {
        if (!value) {
            return;
        }
        if (value && value.length <= limit) {
            return value;
        }
        if (completeWords) {
            limit = value.substr(0, limit).lastIndexOf(' ');
        }

        if (tool) {
            return value.substr(0, limit);
        }

        return value.substr(0, limit) + ellipsis;
    }
}
