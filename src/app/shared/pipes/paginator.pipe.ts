import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { chunk } from 'lodash-es';

@Pipe({
    name: 'paginator'
    // pure: false
})
@Injectable()
export class Paginator implements PipeTransform {
    transform(items: any, ...args: any[]) {
        const correctInput = items !== undefined && items.length > 0 && args[0] !== undefined && args[1] !== undefined;
        // // console.log( 'items', items);
        // console.log('args' , args);
        // // console.log('arrays' , chunk(items, args[0] ) );
        const arrayList = correctInput && chunk(items, args[0]);
        // console.log(arrayList[args[1] - 1] );
        return correctInput ? arrayList[args[1] - 1] : [];
    }
}
