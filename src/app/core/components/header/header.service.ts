import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_METHODS } from '@bper/npm-core/http-handler';
import { HttpHandlerService } from '@bper/npm-core/http-handler';
import { GetUserInfoRequest, GetUserInfoResponse, UserListItems } from './header.model';

const AUTH_ROUTES = {
    users: './mock/users.json'
};

@Injectable()
export class HeaderService {
    public isExpanded: boolean = false;
    constructor(private _httpHandler: HttpHandlerService, private _router: Router) {}

    /** Inutilizzato */
    public getUserInfo(userID: number) {
        const body = { bodyParameters: { userID: userID } };

        return this._httpHandler.retrieveData<GetUserInfoRequest, GetUserInfoResponse>(HTTP_METHODS.GET, AUTH_ROUTES.users, body, {
            mock: true
        });
    }

    public navigate(url: string) {
        this._router.navigateByUrl(url);
    }

    public toggleUserList(): void {
        this.isExpanded = !this.isExpanded;
    }
}
