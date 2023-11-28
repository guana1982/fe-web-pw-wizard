
export interface ErrorModel {
    code: string;
    message: string;
    messageTitle: string;
    messageKey: string;
    layer: string;
}

export type ErrorsData = ErrorData[];

export interface ErrorData {
    code?: string;
    message: string;
    messageTitle?: string;
    messageKey?: string;
    layer?: string;
    error_mapped?: 'Y' | 'N';
}

export enum ErrorSeverity {
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    CRITICAL = 'CRITICAL',
}

export interface ParsedErrorData extends ErrorData {
    additionalData?: any;
    severity?: ErrorSeverity;
}
