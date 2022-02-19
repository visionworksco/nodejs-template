import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/mule/enobotRequests',
  [SwaggerConstants.Tag.MULE_ENOBOT_REQUEST],
  null,
  'mule enobot requests',
  '#/components/schemas/MuleEnobotRequest',
  null,
  ['findAll'],
);

export const MuleEnobotRequests = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
