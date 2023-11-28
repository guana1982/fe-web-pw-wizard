import { apiEndpoint } from './endpoint/api/api.develop';
import { externalUrls } from './endpoint/external/urls.develop';
import { baseEnvironment } from './environment.common';

export const environment = {
    ...baseEnvironment,
    apiEndPoint: apiEndpoint,
    externalUrls: externalUrls,
    production: false,
    mock: true,
    public: false,

    /** Time in seconds */
    pollingSCATime: 3,
};
