export enum CMSId {
    REAL_TIME_ERROR = 'REAL_TIME_ERROR',
    TUTORIAL = 'TUTORIAL',
    TUTORIAL_EX_UBI = 'TUTORIAL_EX_UBI',
    START_PRODUCT_ACTIVATION = 'START_PRODUCT_ACTIVATION',
    BANNER_SURVEY = 'SURVEY_BANNER',
    MODAL_SURVEY = 'MODAL_SURVEY',
    MODAL_50_PERCENTAGE_LESS_PLAFOND = 'MODAL_50_PERCENTAGE_LESS_PLAFOND',
    MODAL_SEND_INFORMATIVE_SET = 'MODAL_SEND_INFORMATIVE_SET',
    MODAL_SENT_DOCUMENTS = 'MODAL_SENT_DOCUMENTS',
    MODAL_SERVICE_DOWN = 'MODAL_SERVICE_DOWN',
    MODAL_INFO_ADD_EXPENSES = 'MODAL_INFO_ADD_EXPENSES',
    MODAL_INFO_CHECK_EXPENSES = 'MODAL_INFO_CHECK_EXPENSES',
    MODAL_SELECT_MINIMUM_EXPENSES = 'MODAL_SELECT_MINUMUM_EXPENSES',
    MODAL_PRACTICE_PENDING_TEXT = 'MODAL_PRACTICE_PENDING_TEXT',
    MODAL_PRACTICE_PENDING_INFORMATIVE_MESSAGE = 'MODAL_PRACTICE_PENDING_INFORMATIVE_MESSAGE',
    MODAL_LESS_ECOLOGICAL_CHOICE = 'MODAL_LESS_ECOLOGICAL_CHOICE',
    MODAL_QAV_ERROR = 'MODAL_QAV_ERROR',
    MODAL_FEEDBACK = 'MODAL_FEEDBACK',
    NEGATIVE_DELIBERATE = 'NEGATIVE_DELIBERATE',
    MODAL_POSITIVE_DELIBERATE = 'MODAL_POSITIVE_DELIBERATE',
    MODAL_PARTIALLY_POSITIVE_DELIBERATE_CASE_1 = 'MODAL_PARTIALLY_POSITIVE_DELIBERATE_CASE_1',
    MODAL_PARTIALLY_POSITIVE_DELIBERATE_CASE_2 = 'MODAL_PARTIALLY_POSITIVE_DELIBERATE_CASE_2',
    MODAL_THANKSGIVING = 'MODAL_THANKSGIVING',
    KYC_POSITIVE = 'KYC_POSITIVE',
    KYC_WAITING = 'KYC_WAITING',
    KYC_NEGATIVE = 'KYC_NEGATIVE',
    ERROR_ATTIVATION = 'ERROR_ATTIVATION'
}

interface CMSImage {
    type: 'success' | 'success-primary-600' | 'error' | 'warning' | 'info' | 'warning-gradient' | 'error-generic' | 'image';
    imgUrl?: string;
}

export interface CMSModal {
    noCloseAction?: boolean;
    image?: CMSImage;
    title: string;
    description: string;
    primaryButtonLabel: string;
    secondaryButtonLabel?: string;
    linkActionLabel?: string;
    inputTextLabel?: string;
}

export interface CMSGeneralContent {
    image: CMSImage;
    title: string;
    description: string;
    primaryButtonLabel: string;
    secondaryButtonLabel?: string;
}

export interface CMSSlideTutorial {
    noCloseAction?: boolean;
    title: string;
    img: string;
    description: string;
    buttonLabel: string;
}

export type CMSSlidesTutorial = CMSSlideTutorial[];

export interface CMSBanner {
    img: string;
    description: string;
    buttonLabel: string;
}
