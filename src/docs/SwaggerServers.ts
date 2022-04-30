import { SwaggerConstants } from './SwaggerConstants';

export default {
  servers: [
    {
      url: `https://nodejs-template.dev.company.com${SwaggerConstants.Config.API_VERSION}`,
      description: 'dev.company.com server',
    },
    {
      url: `http://localhost:8080${SwaggerConstants.Config.API_VERSION}`,
      description: 'localhost server',
    },
  ],
};
