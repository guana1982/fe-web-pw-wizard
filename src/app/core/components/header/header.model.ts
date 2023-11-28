export type UserListItem = UserList;
export type UserListItems = UserList[];

export interface MainLink {
    canNavigate?: boolean;
    label: string;
    icon: string;
    notifications?: number;
    url?: string;
    description?: string;
    order?: number;
    featureReference?: string;
    visible: boolean;
}

export interface UserList {
    active: boolean;
    featureReference?: string;
    id: number;
    label: string;
    order: number;
    notifications?: number;
    description?: string;
    visible: boolean;
    // url: string;
}

interface Notifications {
    documenti: number;
    comunicazioni: number;
}

export interface User {
    id: string | number;
    name: string;
    notifications: Notifications;
    email: string;
    conto: string;
    commissioniBonifico: number;
}

export interface GetUserInfoRequest {
    userID: number;
}

export interface GetUserInfoResponse {
    id: string | number;
    name: string;
    notifications: Notifications;
}
