import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private route: ActivatedRoute) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Prendere il sessionCookie
        // let sessionCookieValue: any = undefined;
        // const sessionTokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionToken='));
        // if (sessionTokenCookie) {
        //     sessionCookieValue = sessionTokenCookie.split('=')[1];
        // } else {
        //     // Cerco e imposto il sessionCookie
        //     const cookies = document.cookie.split('; ');
        //     for (const cookie of cookies) {
        //         const [name, value] = cookie.split('=');
        //         if (name === 'sessionCookie') {
        //             sessionCookieValue = value;
        //             document.cookie = `sessionToken=${sessionCookieValue}`;
        //             break;
        //         }
        //     }
        // }

        // if (sessionCookieValue !== undefined) {
        //     console.log('Valore del cookie di sessione:', sessionCookieValue);
        // } else {
        //     console.log('Cookie di sessione non definito.');
        // }

        // Prendere il valore tramite queryParams e assegnarlo al sessionCookie
        const queryParams = this.route.snapshot.queryParams;
        const token = queryParams['token'];

        if (token) {
            document.cookie = `sessionToken=${token}`;
        }
        return next.handle(request);
    }
}
