import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CMSBanner, CMSGeneralContent, CMSId, CMSModal, CMSSlidesTutorial } from '../../models/generics/cms.model';

import { cmsMock } from '../../constants/cms-mock';

@Injectable()
export class CMSSupportService {
    private _parseCMSDataPageEsito(dataCMS: string) {
        const data = JSON.parse(dataCMS) as CMSGeneralContent;

        const dataParsed = this._initData(data);

        if (data.image.imgUrl) {
            dataParsed['imageUrl'] = data.image.imgUrl;
        }

        return dataParsed;
    }

    public getCMSTutorial(id: CMSId): Observable<CMSSlidesTutorial> {
        return of(JSON.stringify(cmsMock[id])).pipe(
            map(dataCMS => {
                const data = JSON.parse(dataCMS) as CMSSlidesTutorial;
                return data;
            }),
            catchError(err => {
                return of(cmsMock[id] as CMSSlidesTutorial);
            })
        );
    }

    public getCMSBanner(id: CMSId): Observable<CMSBanner> {
        return of(JSON.stringify(cmsMock[id])).pipe(
            map(dataCMS => {
                const data = JSON.parse(dataCMS) as CMSBanner;
                return data;
            }),
            catchError(err => {
                return of(cmsMock[id] as CMSBanner);
            })
        );
    }

    public getCMSDataModal(id: CMSId) {
        return of(JSON.stringify(cmsMock[id])).pipe(
            map(dataCMS => this._parseCMSDataModel(dataCMS)),
            catchError(err => {
                return of(this._parseCMSDataModel(JSON.stringify(cmsMock[id])));
            })
        );
    }

    private _parseCMSDataModel(dataCMS: string) {
        const data = JSON.parse(dataCMS) as CMSModal;

        const dataParsed: any = this._initData(data);

        dataParsed['noCloseButton'] = data.noCloseAction;

        if (data.image && data.image.imgUrl) {
            dataParsed['imageUrl'] = data.image.imgUrl;
        }

        if (data.linkActionLabel) {
            dataParsed['linkActionLabel'] = data.linkActionLabel;
        }

        if (data.inputTextLabel) {
            dataParsed['inputTextLabel'] = data.inputTextLabel;
        }

        return dataParsed;
    }

    private _initData(data: any) {
        return {
            title: data.title,
            descriptionHtml: data.description,
            type: data.image?.type,
            primaryButtonLabel: data.primaryButtonLabel,
            secondaryButtonLabel: data.secondaryButtonLabel
        };
    }

    /**
     * @param string: stringa da modificare
     * @param replacements: Oggetto contenente i valori da inserire nella stringa. Dove la chiave corrisponde al placeholder
     * EX. Hai un plafond PLACEHOLDER_AMOUNT => replacements = { amount: "Mike" }
     */
    public parseString(string: string, replacements: { [key: string]: string }) {
        Object.keys(replacements).forEach(key => {
            const placeholder = ('placeholder_' + key).toUpperCase();
            const reg = new RegExp(`${placeholder}`, 'g');
            string = string.replace(reg, function (all) {
                return replacements[key] || all;
            });
        });

        return string;
    }
}
