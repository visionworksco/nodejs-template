import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/mule/enobotStrategies',
  [SwaggerConstants.Tag.MULE_ENOBOT_STRATEGY],
  null,
  'mule enobot strategies',
  '#/components/schemas/MuleEnobotStrategy',
  null,
  ['findAll'],
);

export const MuleEnobotStrategies = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
