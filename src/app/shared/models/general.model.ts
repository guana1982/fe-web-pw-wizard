import {CMSInfoContentFormats, CMSInfoContentTypes} from "@shared/models/cms-data.model";

export interface StateInt {
    [key: string]: any;
}

export type GenericObject<T = any> = { [key in number | string]: T };

export interface BaseDomain {
    code: string;
    description: string;
}

export interface FileUpload {
    filename: string;
    base64File: string | ArrayBuffer;
}

export type ResourceType = 'JPEG' | 'JPG' |'PDF' | 'XLS' | 'XML' | 'URL' | 'ZIP';

export interface InfoBoxConfig {
    content: string;
    disableGridLayout?: boolean;
    format: CMSInfoContentFormats;
    isStatic: boolean;
    type: CMSInfoContentTypes;
}
