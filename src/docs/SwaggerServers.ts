import { SwaggerConstants } from './SwaggerConstants';

export default {
  servers: [
    {
      url: `https://intraday-cockpit-back.dev.enocloud.eu${SwaggerConstants.Config.API_VERSION}`,
      description: 'dev.enocloud.eu server',
    },
    {
      url: `http://localhost:8080${SwaggerConstants.Config.API_VERSION}`,
      description: 'localhost server',
    },
  ],
};
