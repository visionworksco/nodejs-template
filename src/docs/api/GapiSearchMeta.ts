import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/gapi/search/meta',
  [SwaggerConstants.Tag.GAPI_SEARCH_META],
  null,
  'gapi meta data',
  '#/components/schemas/GapiMeta',
  null,
  ['findAll'],
);

export const GapiSearchMeta = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
