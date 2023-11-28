import { format, isDate, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

export const dateToKey = (date): string => (isDate(date) ? format(date, 'YYYY-MM-DD') : '_$$ERRORS_KEY_');

export const dateToYMKey = (date: Date): string => {
    date = new Date(date);
    return format(date, 'YYYY_MM');
};

export const dateToWeekKey = (date: Date): string => (isDate(date) ? format(date, 'WW') : '_$$ERRORS_KEY_');

export interface IRangeData {
    dateFrom: string | Date;
    dateTo: string | Date;
    rangeKey: string;
}

export const calcolateMonthRange = (day: Date): IRangeData => {
    const firstOfMonth = startOfDay(startOfMonth(day));
    const lastOfMonth = endOfDay(endOfMonth(day));

    return {
        dateFrom: firstOfMonth,
        dateTo: lastOfMonth,
        rangeKey: dateToYMKey(day)
    };
};

export function toFormat(formato: string = 'DD/MM/YYYY') {
    return value => format(value, formato);
}

export function isDDMMYYYY(date: string):boolean {
    // Check if date is DD/MM/yyyy
    const expr = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
    return expr.test(date)
}