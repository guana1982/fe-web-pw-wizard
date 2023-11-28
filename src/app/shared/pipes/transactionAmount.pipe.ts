import { PipeTransform, Pipe } from '@angular/core';
import { CurrencyPipe } from "@angular/common";

@Pipe({
    name: 'transactionAmount'
})
export class TransactionAmountPipe implements PipeTransform {
    constructor(
        private _currencyPipe: CurrencyPipe
    ) {}


    transform(value: number, currency?: string): string | number {
        const sign = (value > 0) ? '+' : '';
        return sign + this._currencyPipe.transform(value, currency);
    }
}
