import { Injectable } from '@angular/core';
import { HTTP_METHODS } from '@core/services/http/http-api.model';
import { HttpHandlerService } from '@core/services/http/http-handler.service';
import { GetFestivitiesResponse } from '@shared/models/utilities/festivities.model';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BASE_PATH = '/private/accounts/v1/';
const BASE_API_ROOT = environment.apiEndPoint.BFFE_PAYMENTS + BASE_PATH;

const UTILITIES_ROUTES = {
  // Endpoint BFFE
  festivities: BASE_API_ROOT + 'transfers/festivities'

  // Mock
  // festivities: 'mock/festivities.json'
};

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private _httpHandler: HttpHandlerService) { }

  public getFestivities() {
    return this._httpHandler.retrieveData<null, GetFestivitiesResponse>(
      HTTP_METHODS.GET,
      UTILITIES_ROUTES.festivities,
      {},
      {
        // mock: true,
        expiresIn: 24 * 60 * 60000
      }
    ).pipe(
      map(res => console.log("utilities: "+JSON.stringify(res))),
      shareReplay()
    );
  }
}
