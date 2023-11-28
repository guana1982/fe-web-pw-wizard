/** Interface for rendering content generic **/

import { EsitiTypes } from "@shared/components/bper-esito/bper-esito.component"

export enum PagaPoiButtonEvent {
    CLOSE = "close",
    PRIMARY_ACTION = "primary_action",
    SECONDARY_ACTION = "secondary_action"
}

export interface PagaPoiEsitoData {
    noCloseButton: boolean,
    type: EsitiTypes,
    imageUrl: string,
    title: string,
    descriptionHtml: string,
    marginTop: string,
    primaryButtonLabel: string,
    secondaryButtonLabel?: string,
    linkActionLabel?: string,
    inputTextLabel?: string
}