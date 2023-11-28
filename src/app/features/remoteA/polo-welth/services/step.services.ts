import { Injectable } from '@angular/core';
//import { UserDataService } from '@bper/npm-core/user-data';
import { UserDataService } from './user-data.service';
import { catchError, map, take } from 'rxjs/operators';
import { BehaviorSubject, of, pipe } from 'rxjs';
import { UtilitiesService } from '@shared/services/utilities/utilities.service';
import { CmsDataService } from '@core/services/cms-data/cms-data.service';
import { CmsGenericSections } from '@core/services/cms-data/cms-sections.constants';

@Injectable({
    providedIn: 'root'
})
export class StepService {
    private currentStepIndex: number;
    error$ = new BehaviorSubject<any>(null);

    constructor(
        private _userDataService: UserDataService,
        private _utilitiesService: UtilitiesService,
        private _cmsDataService: CmsDataService
    ) {}

    getCurrentStepIndex(): number {
        return this.currentStepIndex;
    }

    setCurrentStepIndex(newIndex: number): void {
        this.currentStepIndex = newIndex;
    }

    goToNextStep(): void {
        this._utilitiesService.getFestivities().pipe(map(festivities => console.log(JSON.stringify(festivities))));

        /*
    this._userDataService.getUserData().subscribe( (data: any) => {
      console.log("data: "+JSON.stringify(data));
      },
      (error: any) => {
          console.error('Errore durante la richiesta:', error);
      });
    

    console.log("MOCK userDataService !!!!!!!!!!!!! " );
*/

        /*const mock = {};
     this._cmsDataService.retrieveGenericContents(CmsGenericSections.RED_IBAN).pipe(
      take(1),
      map(res => res?.contents[0]?.content),
      map(res => typeof res?.contents[0] === 'string' ? JSON.parse(res?.contents[0]) : res?.contents[0] ),
      map(content => (!content) ? mock : content),
      map(({ redIbanAbi, active }) => {
         console.log("redIbanAbi> "+redIbanAbi+" active > "+active )
      })
  ).subscribe()
*/

        this._userDataService;
        /* this._userDataService.userAccesses$
            .pipe(
                map(res => console.log("UserData err: "+JSON.stringify(res))),
                //map(res => res.sort((a, b) => new Date(b.dateTimeOfAccess).getTime() - new Date(a.dateTimeOfAccess).getTime())),
                catchError(err => {
                     console.log("UserData err: "+JSON.stringify(err));
                    this.error$.next(err);
                    return of(null);
                })
            )
            .subscribe(sortedAccess => console.log("UserData resp: "+JSON.stringify(sortedAccess)));
*/
        this.currentStepIndex++;
        console.log('GO TO NEXT STEPS.....' + this.currentStepIndex);
    }

    goToPreviousStep(): void {
        this.currentStepIndex--;
        console.log('GO TO NEXT STEPS.....' + this.currentStepIndex);
    }
}
