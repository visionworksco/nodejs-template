import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/mule/enobotCustomerStrategies',
  [SwaggerConstants.Tag.MULE_ENOBOT_CUSTOMER_STRATEGY],
  null,
  'mule enobot customer strategies',
  '#/components/schemas/MuleEnobotCustomerStrategy',
  null,
  ['findAll'],
);

export const MuleEnobotCustomerStrategies = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
