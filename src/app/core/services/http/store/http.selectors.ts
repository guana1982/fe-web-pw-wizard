import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getHttpStoreId, IHttpState, isStateValid } from '../http-api.model';
import * as fromHttp from './http.reducer';

export const selectHttpState = createFeatureSelector<fromHttp.HttpState>(fromHttp.HTTP_FEATURE_NAME);

export const selectHttps = createSelector(selectHttpState, fromHttp.selectAll);

export const selectHttpEntities = createSelector(selectHttpState, fromHttp.selectEntities);

export const validHttps = createSelector(selectHttps, https => https.map(http => isStateValid(http)));

export const selectHttpResponse = (url: string, request: string) =>
    createSelector(selectHttpEntities, https => {
        const id = getHttpStoreId({ url, request });
        if (!id || !isStateValid(https[id])) return null;

        return JSON.parse(https[id].response);
    });

export const selectHttpPrevStatus = (url: string, request: string) =>
    createSelector(selectHttpEntities, https => {
        const id = getHttpStoreId({ url, request });
        if (!id || !isStateValid(https[id])) return null;

        const parsedRequest = JSON.parse(https[id].request);
        const parsedResponse = JSON.parse(https[id].response);

        return { url: https[id].url, request: parsedRequest, response: parsedResponse };
    });

export const selectHttpLastStatus = (url: string) =>
    createSelector(selectHttpEntities, https => {
        const httpKeys = Object.keys(https);

        let lastUpdate = 0;
        const lastState: IHttpState = httpKeys
            .filter(key => key.indexOf(url) === 0)
            .reduce((acc, curKey) => {
                if (https[curKey].lastUpdate < lastUpdate) return acc;

                lastUpdate = https[curKey].lastUpdate;
                return https[curKey];
            }, {} as IHttpState);

        if (!isStateValid(lastState as IHttpState)) return null;

        const parsedRequest = JSON.parse(lastState.request || '');
        const parsedResponse = JSON.parse(lastState.response || '');

        return { url: lastState.url, request: parsedRequest, response: parsedResponse };
    });
