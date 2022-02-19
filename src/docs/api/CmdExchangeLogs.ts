import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/cmdExchangeLogs',
  [SwaggerConstants.Tag.CMD_EXCHANGE_LOG],
  'cmd exchange log',
  'cmd exchange logs',
  '#/components/schemas/CmdExchangeLog',
  null,
  ['findAll', 'deleteById'],
);

export const CmdExchangeLogs = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
