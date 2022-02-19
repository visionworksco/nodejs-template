import api from './api';
import swaggerComponents from './SwaggerComponents';
import swaggerInfo from './SwaggerInfo';
import swaggerServers from './SwaggerServers';
import swaggerTags from './SwaggerTags';

export default {
  ...swaggerInfo,
  ...swaggerServers,
  ...swaggerComponents,
  ...swaggerTags,
  ...api,
};
