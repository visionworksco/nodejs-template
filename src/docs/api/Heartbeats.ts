import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/heartbeats',
  [SwaggerConstants.Tag.HEARTBEATS],
  null,
  'heartbeats',
  '#/components/schemas/Heartbeats',
  null,
  ['findAll'],
);

export const Heartbeats = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
