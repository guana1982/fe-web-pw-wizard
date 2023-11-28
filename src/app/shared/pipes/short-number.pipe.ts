import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {
    constructor(public currency: CurrencyPipe) {}

    transform(number: number, args: any = '', potenza: any = 5): any {
        if (isNaN(number)) {
            return null;
        } // will only work value is a number
        if (number === null) {
            return null;
        }
        if (number === 0) {
            return 0;
        }
        let abs = Math.abs(number);
        const rounder = Math.pow(10, 1);
        const isNegative = number < 0; // will also work for Negative numbers
        let key = '';

        const powers = [
            { key: 'Quint', value: Math.pow(10, 15) },
            { key: 'Tril', value: Math.pow(10, 12) },
            { key: 'B', value: Math.pow(10, 9) },
            { key: 'M', value: Math.pow(10, 6) },
            { key: 'K', value: Math.pow(10, 3) }
        ];

        if (abs < Math.pow(10, potenza)) {
            return this.currency.transform(abs, args);
        }

        for (let i = 0; i < powers.length; i++) {
            let reduced = abs / powers[i].value;
            reduced = Math.round(reduced * rounder) / rounder;
            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key;
                break;
            }
        }
        return (isNegative ? '-' : '') + abs + key + args;
    }
}
