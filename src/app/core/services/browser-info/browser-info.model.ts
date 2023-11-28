export enum BROWSER_EVENTS {
    ONLINE = 'online',
    OFFLINE = 'offline',
    RESIZE = 'resize'
}

export interface BrowserStatus {
    type: BROWSER_EVENTS.ONLINE | BROWSER_EVENTS.OFFLINE;
}
