import { createAction, props } from '@ngrx/store';
import { GenericObject } from '@shared/models/general.model';

export const saveHttpCall = createAction(
    '[HTTP Handler] Save API Call',
    props<{ url: string; request?: string; response?: string; duration?: number; expiresIn?: number }>()
);
