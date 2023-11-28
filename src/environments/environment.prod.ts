import { apiEndpoint } from './endpoint/api/api.prod';
import { externalUrls } from './endpoint/external/urls.prod';
import { baseEnvironment } from './environment.common';

export const environment = {
    ...baseEnvironment,
    apiEndPoint: apiEndpoint,
    externalUrls: externalUrls,
    production: true,
    mock: false,
    public: false,
    /** Time in seconds */
    pollingSCATime: 3,
};
