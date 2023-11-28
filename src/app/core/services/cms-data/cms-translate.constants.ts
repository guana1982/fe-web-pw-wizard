import { GenericObject } from '@shared/models/general.model';

export type CMS_TRANSLATE_TYPE = GenericObject<string | GenericObject>;

export const CMS_TRANSLATE: CMS_TRANSLATE_TYPE = {
    TEST: 'Questo è un test key-value',
    TEST_NESTED: { 
        NESTED: 'Questo è un test con chiavi innestate value!'
    },
}