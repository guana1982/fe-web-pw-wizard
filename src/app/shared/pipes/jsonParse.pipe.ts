import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jsonParse'
})
@Injectable()
export class JsonParsePipe implements PipeTransform {
    transform(value: string) {
        return typeof value === 'string' ? JSON.parse(value) : value;
    }
}