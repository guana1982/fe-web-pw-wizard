import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateToText'
})
@Injectable()
export class DateToTextPipe implements PipeTransform {
    transform(value: string, dateAttr: 'day' | 'month', stringLength: number) {
        if(!stringLength) {
            stringLength = 3;
        }

        if(!dateAttr) {
            dateAttr = 'month';
        }

        const days: string[] = ['LUNEDI', 'MARTEDI', 'MERCOLEDI', 'GIOVEDI', 'VENERDI', 'SABATO', 'DOMENICA'];
        const months: string[] = ['GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO', 'LUGLIO', 'AGOSTO', 'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE'];

        const stringTransform = (array: string[], index: number) => {
            const string = array[index];
            let newString = '';

            if( !string?.length ) return '';

            for(let i=0; i<string.length; i++) {
                if(i===stringLength) {
                    return newString;
                }

                newString += string[i];
            }

            return newString;
        }

        if(dateAttr === 'day') {
            return stringTransform(days, new Date(value).getDay());
        }
        if(dateAttr === 'month') {
            return stringTransform(months, new Date(value).getMonth());
        }
    }
}