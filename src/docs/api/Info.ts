import { SwaggerCommon } from '../SwaggerCommon';
import { SwaggerConstants } from '../SwaggerConstants';

export const Info = {
  paths: {
    // findById
    '/info/{id}': {
      get: {
        tags: [SwaggerConstants.Tag.INFO],
        summary: `Find info`,
        description: `Find info`,
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Should be undefined',
            example: 'undefined',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: SwaggerCommon.response.reponseOk(
            SwaggerConstants.Response.OK,
            '#/components/schemas/Info',
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
  },
};
