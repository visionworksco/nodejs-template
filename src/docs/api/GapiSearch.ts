import { SwaggerConstants } from '../SwaggerConstants';

export const GapiSearch = {
  paths: {
    // findAll
    '/gapi/search': {
      get: {
        tags: [SwaggerConstants.Tag.GAPI_SEARCH],
        summary: `Find gapi data`,
        description: `Find gapi data`,
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
            name: 'source',
            in: 'query',
            description: 'Source',
            example: 'Meteologica',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'name',
            in: 'query',
            description: 'Name',
            example: 'PV_forecast_Meteologica_Total_latest',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'ts_start',
            in: 'query',
            description: 'ts start date',
            example: SwaggerConstants.Example.DATE_TIME,
            schema: {
              type: 'string',
              format: SwaggerConstants.Format.DATE_TIME,
            },
          },
          {
            name: 'ts_end',
            in: 'query',
            description: 'ts end date',
            example: SwaggerConstants.Example.DATE_TIME,
            schema: {
              type: 'string',
              format: SwaggerConstants.Format.DATE_TIME,
            },
          },
          {
            name: 'time',
            in: 'query',
            description: 'Time',
            example: 'local',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: SwaggerConstants.Response.OK,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['type', 'data', 'paginator'],
                  properties: {
                    type: {
                      type: 'string',
                      nullable: true,
                      enum: ['ts_tp', 'ts_tp2'],
                      description: 'Type',
                      example: 'ts_tp',
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/EnobotTimeSerie',
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
