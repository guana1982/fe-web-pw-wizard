import { Injectable } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class FeatureReducerFactory {
    private featureReducerMap: { [key in string]: ActionReducerMap<any> } = {};

    constructor() {}

    merge(featureName: string, reducerMap: ActionReducerMap<any>): ActionReducerMap<any> {
        this.featureReducerMap[featureName] = { ...this.featureReducerMap[featureName], ...reducerMap };
        return this.featureReducerMap[featureName];
    }
}
