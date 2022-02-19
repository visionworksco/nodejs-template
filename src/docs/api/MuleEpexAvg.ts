import { SwaggerConstants } from '../SwaggerConstants';

export const MuleEpexAvg = {
  paths: {
    // findAll
    '/mule/epexAvg': {
      get: {
        tags: [SwaggerConstants.Tag.MULE_EPEX_AVG],
        summary: `Find mule epex avg`,
        description: `Find mule epex avg`,
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
                        $ref: '#/components/schemas/MuleEpexAvg',
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
