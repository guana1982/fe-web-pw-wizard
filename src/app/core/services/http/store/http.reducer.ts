import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { httpSortComparer, IHttpState, getHttpStoreId } from '../http-api.model';
import { HttpActions } from './http.action-types';

export const HTTP_FEATURE_NAME = 'http-api';

export interface HttpState extends EntityState<IHttpState> {}

export const httpStateAdapter = createEntityAdapter<IHttpState>({
    selectId: getHttpStoreId,
    sortComparer: httpSortComparer
});

export const initialHttpState = httpStateAdapter.getInitialState();

export const httpReducer = createReducer(
    initialHttpState,
    on(HttpActions.saveHttpCall, (state, action) => {
        const request = action.request || '',
            response = action.response || '';

        const timeNow = Date.now();
        const lastUpdate = timeNow,
            expIn = action.expiresIn === undefined ? 20000 : action.expiresIn,
            expAt = lastUpdate + expIn;

        const httpState = {
            url: action.url,
            request,
            response,
            lastUpdate,
            expIn,
            expAt
        };

        return httpStateAdapter.setOne(httpState, state);
    })
);

export const { selectAll, selectEntities } = httpStateAdapter.getSelectors();
