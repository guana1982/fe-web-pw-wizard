import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { IComparatr } from '@shared/utils/filter';

@Pipe({
    name: 'filterForm'
})
@Injectable()
export class FilterObjPipe implements PipeTransform {
    transform(items: Array<any>, formSeletion, comparators: { [key in string]: IComparatr }) {
        const filterData = Object.keys(formSeletion)
            .map(elem => ({ key: elem, val: formSeletion[elem] }))
            .filter(elemA => {
                return elemA.val !== '' && elemA.val !== null;
            });
        return items.filter(iniziativa =>
            filterData.every(elem => {
                return comparators[elem.key](iniziativa[elem.key], elem.val);
            })
        );
    }
}
