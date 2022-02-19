import { SwaggerCommon } from '../SwaggerCommon';
import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/settings',
  [SwaggerConstants.Tag.SETTINGS],
  'settings',
  null,
  '#/components/schemas/Settings',
  '#/components/schemas/SettingsPayload',
  ['findById', 'updateById'],
);

export const Settings = {
  paths: {
    '/settings/default': {
      get: {
        tags: [SwaggerConstants.Tag.SETTINGS],
        summary: `Find settings default`,
        description: `Find settings default`,
        responses: {
          200: SwaggerCommon.response.reponseOk(
            SwaggerConstants.Response.OK,
            '#/components/schemas/Settings',
          ),
          404: {
            $ref: '#/components/responses/404',
          },
          500: {
            $ref: '#/components/responses/500',
          },
        },
      },
    },
    ...apiDocs.getPaths().paths,
  },
};
