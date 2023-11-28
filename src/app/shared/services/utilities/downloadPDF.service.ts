import { Injectable } from '@angular/core';
import {ResourceType} from "@shared/models/general.model";
import { downloadFromUrl } from '@shared/utils/helpers/utils.helper';

function download(fileName: string, hrefData: string) {
    const downloadLink = document.createElement('a');

    downloadLink.href = hrefData;
    downloadLink.download = fileName;
    downloadLink.click();
    return true;
}

@Injectable({
    providedIn: 'root'
})
export class DownloadResourcesService {
    public downloadResources(fileName: string, resourceData: string, resourceType: ResourceType = 'PDF', index: number = 0) {
        let hrefData;

        switch(resourceType) {
            case 'PDF':
                hrefData = 'data:application/pdf;base64,' + resourceData;
                break;
            case 'XLS':
                hrefData = 'data:application/vnd.ms-excel;base64,' + resourceData;
                break;
            case 'ZIP':
                hrefData = 'data:application/octet-stream;base64,' + resourceData
                break;
            case 'URL':
            default:
                hrefData = resourceData;
                break;
        }

        // return download(fileName, hrefData);
        return downloadFromUrl(hrefData, fileName, index);
    }
}
