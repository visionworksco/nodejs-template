import { SwaggerConstants } from '../SwaggerConstants';

export const MuleEpexObContracts = {
  paths: {
    // findAll
    '/mule/epexObContracts': {
      get: {
        tags: [SwaggerConstants.Tag.MULE_EPEX_OB_CONTRACT],
        summary: `Find epex ob contracts`,
        description: `Find epex ob contracts`,
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
            $ref: '#/components/parameters/seriesname',
          },
          {
            $ref: '#/components/parameters/longname',
          },
        ],
        responses: {
          200: {
            description: SwaggerConstants.Response.OK,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['data', 'paginator'],
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/MuleEpexObContract',
                      },
                    },
                    paginator: {
                      $ref: '#/components/schemas/Paginator',
                    },
                    error: {
                      $ref: '#/components/schemas/Error',
                    },
                  },
                },
              },
            },
          },
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
