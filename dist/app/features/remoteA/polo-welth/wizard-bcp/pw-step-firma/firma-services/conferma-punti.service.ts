import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable()
export class ConfermaPuntiService {
    constructor(private router: Router) {}

    getData(): Observable<any> {
        return undefined;
    }

    updateData(): Observable<any> {
        return undefined;
    }

    nextPage(element: Array<{ outlets: { signature: string[] } }>): void {
        this.router.navigate(element);
    }
    previousPage(element: Array<{ outlets: { signature: string[] } }>): void {
        this.router.navigate(element);
    }
}
