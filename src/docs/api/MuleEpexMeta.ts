import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/mule/epexMeta',
  [SwaggerConstants.Tag.MULE_EPEX_META],
  null,
  'mule epex meta',
  '#/components/schemas/MuleEpexMeta',
  null,
  ['findAll'],
);

export const MuleEpexMeta = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
