import { SwaggerConstants } from '../SwaggerConstants';

export const MuleEpexPublicTradeContracts = {
  paths: {
    // findAll
    '/mule/epexPublicTradeContracts': {
      get: {
        tags: [SwaggerConstants.Tag.MULE_EPEX_PUBLIC_TRADE_CONTRACT],
        summary: `Find epex public trade contracts`,
        description: `Find epex public trade contracts`,
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
                        $ref: '#/components/schemas/MuleEpexPublicTradeContract',
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
