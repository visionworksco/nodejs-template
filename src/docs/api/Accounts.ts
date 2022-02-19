import { SwaggerCommon } from '../SwaggerCommon';
import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/accounts',
  [SwaggerConstants.Tag.ACCOUNT],
  'account',
  null,
  '#/components/schemas/Account',
  '#/components/schemas/AccountPayload',
  ['save', 'updateById'],
);

export const Accounts = {
  paths: {
    '/accounts/email/{email}': {
      get: {
        tags: [SwaggerConstants.Tag.ACCOUNT],
        summary: `Find account by email`,
        description: `Find account by email`,
        parameters: [
          {
            $ref: '#/components/parameters/email',
          },
        ],
        responses: {
          200: SwaggerCommon.response.reponseOk(
            SwaggerConstants.Response.OK,
            '#/components/schemas/Account',
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
    '/accounts/email/{email}/chartWidgets': {
      get: {
        tags: [SwaggerConstants.Tag.ACCOUNT],
        summary: `Find chart widgets by account email`,
        description: `Find chart widgets by account email`,
        parameters: [
          {
            $ref: '#/components/parameters/sort',
          },
          {
            $ref: '#/components/parameters/page',
          },
          {
            $ref: '#/components/parameters/pageLimit',
          },
          {
            $ref: '#/components/parameters/email',
          },
        ],
        responses: {
          200: SwaggerCommon.response.reponsePageableOk(
            SwaggerConstants.Response.OK,
            '#/components/schemas/ChartWidget',
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
