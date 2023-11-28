import { getTime } from 'date-fns';

export type IComparatr = (a, b) => boolean;

export interface IFilterField {
    key: string;
    filterKey?: string;
    comparator: IComparatr;
}

export const filterForFields = function (filterFields: IFilterField[], filterValue, elem, index?, arrayRef?): boolean {
    return filterFields.every(filterField => {
        const { key, filterKey = key, comparator } = filterField;
        return comparator(elem[key], filterValue[filterKey]);
    });
};

// STRING COMPARATOR
export const comparatorStirng: IComparatr = (a: string, b: string) => {
    // TODO RIVEDERE CON RICCARDO MARTELLATA PER FAR FUNZIONARE I FILTRI
    if (a === undefined) {
        a = '';
    }
    if (b === undefined) {
        b = '';
    }
    return !b || a.toLowerCase() === b.toLowerCase();
};

export const comparatorSearch: IComparatr = (a: string, b: string) => {
    return !b || (!!a && a.toLowerCase().indexOf(b.toLowerCase()) !== -1);
};

// DATE COMPARATOR
export const comparatorDateMajor: IComparatr = (a: Date, b: Date) => {
    return !b || getTime(a) >= getTime(b);
};

export const comparatorDateMinor: IComparatr = (a: Date, b: Date) => {
    return !b || getTime(a) <= getTime(b);
};

export const comparatorNumbers: IComparatr = (a: number, b: number) => {
    return !b || a === b;
};

export const comparatorBoolean: IComparatr = (a: boolean, b: boolean) => {
    if (b === false && a !== b) {
        return false;
    }
    return !b || a === b;
};

export const comparatorOperationCustom: IComparatr = (a: any, b: any) => {
    // tslint:disable-next-line:no-eval
    return !b || eval(a + b);
};

// export const comparatorDateMajor: IComparatr = (a: Date, b: Date) => {
//     return !b || (new Date(a)).getTime() >= (new Date(b)).getTime();
// };

// export const comparatorDateMinor: IComparatr = (a: Date, b: Date) => {
//     return !b || (new Date(a)).getTime() <= (new Date(b)).getTime();
// };
