import { Pipe, PipeTransform } from '@angular/core';
import { CmsDataService } from '@core/services/cms-data/cms-data.service';
import { IComparatr } from '@shared/utils/filter';

@Pipe({ 
    name: 'cmsTranslate'
})
export class CmsTranslatePipe implements PipeTransform {
    constructor( private _cmsService: CmsDataService ) {}

    /**
     * Trasforma la chiave in input in un testo censito su CMS.
     * 
     * @param key Indica la chiave per recuperare il valore mappato su cms. 
     *     Per recuperare campi incrociati, è possibile separare le varie chiavi con un '.'
     * @param defaultValue Opzionale. Se assente il suo valore sarà la chiave 'key'. Utilizzato in caso di campo non censito a CMS  
     * @returns la stringa recuperata da CMS o la chiave utilizzata
     */
    transform( key: string, defaultValue: string = key ) {
        const dictionary = this._cmsService.cmsTranslateDictionary;

        if( typeof key != 'string' ) {
            console.error("[CMS TRANSLATE][ERROR] Chiave non valida");
            return '[CMS TRANSLATE][ERROR]';
        }

        /** Split key per recuperare campi innestati e parsing da dictionary */
        const keys = key.split('.');
        const parsedText = keys.reduce((parsed, curKey) => {
            if( parsed === undefined ) return undefined;

            if( typeof parsed == 'object' ) {
                return parsed ? parsed[curKey] : null; // Utilizzando un'istruzione condizionale

            }

            return dictionary[curKey] 
        }, '');

        if( typeof parsedText == 'object' ) {
            return defaultValue || '';
        }

        return parsedText || defaultValue || '';
    }
}
