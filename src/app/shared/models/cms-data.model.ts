import { ErrorSeverity } from "./errors.model";

export interface CMSBaseRequest {
    lang?: string;
}

export interface CMSErrorData {
    code: string;
    message: string;
    severity: ErrorSeverity;
}

export interface GetCMSErrorsRequest extends CMSBaseRequest {};

export interface GetCMSErrorsResponse {
    errors: CMSErrorData[];
}

export type CMSInfoContentFormats = "text" | "html" | "url";
export type CMSInfoContentTypes = "INFO" | "NORMATIVE" | "OTHER" | "WARNING" | "ERROR";

export interface CMSInfoContent {
    area?: string,
    badge: string,
    content: string,
    format: CMSInfoContentFormats,
    id?: string,
    page?: string,
    section?: string,
    title?: string,
    type: CMSInfoContentTypes,
    validFrom?: string,
    validTo?: string
}

export interface GetCMSInfoContentsRequest extends CMSBaseRequest {};

export interface GetCMSInfoContentsResponse {
    contents: CMSInfoContent[]
}

export type CMSEditorialFeatureReferenceTypes = "internal_action" | "url";
export interface CMSEditorialFeatureReference {
    reference: string,
    type: CMSEditorialFeatureReferenceTypes
}

export interface CMSEditorialContent {
    content: string,
    featureReference: CMSEditorialFeatureReference,
    id: string,
    imgUrl: string,
    section: string,
    template: string,
    title: string,
    validFrom: string,
    validTo: string
}

export interface GetCMSEditorialContentsRequest extends CMSBaseRequest {};

export interface GetCMSEditorialContentsResponse {
    contents: CMSEditorialContent[]
}

export interface CMSGenericContent {
    content: string,
    id: string,
    section: string,
    validFrom: string,
    validTo: string
}

export interface GetCMSGenericContentsRequest extends CMSBaseRequest {};

export interface GetCMSGenericContentsResponse {
    contents: CMSGenericContent[]
}