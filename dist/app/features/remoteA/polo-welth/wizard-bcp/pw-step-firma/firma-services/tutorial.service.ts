import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { IBperFirmaTutorialDataSource } from '@bper/firma-feq-fe';
import { CheckActiveResponse } from '@bper/firma-feq-fe/lib/interfaces/documentazione';
import { HTTP_METHODS, HttpHandlerService } from '@bper/npm-core/http-handler';

import { environment } from 'src/environments/environment';

const basePathFEQ = `${environment.apiEndPoint.BFFE_BPERBOX}/private/feq`;

@Injectable()
export class TutorialService implements IBperFirmaTutorialDataSource {
    constructor(private router: Router, private http: HttpHandlerService) {}

    startup(): Observable<CheckActiveResponse> {
        return this.http.retrieveData<null, CheckActiveResponse>(HTTP_METHODS.GET, basePathFEQ + '/tutorial/active');
    }

    getData(): Observable<any> {
        return undefined;
    }

    updateData(): Observable<any> {
        return undefined;
    }

    nextPage(element: Array<{ outlets: { signature: string[] } }>): void {
        this.router.navigate(element);
    }
}
