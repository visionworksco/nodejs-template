import { SwaggerCommon } from '../SwaggerCommon';
import { SwaggerConstants } from '../SwaggerConstants';

export const StatkraftEnobotRequests = {
  paths: {
    // findAll
    '/statkraft/enobotRequests': {
      get: {
        tags: [SwaggerConstants.Tag.STATKRAFT_ENOBOT_REQUEST],
        summary: `Find statkraft enobot requests`,
        description: `Find statkraft enobot requests`,
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
            name: 'delivery_start',
            in: 'query',
            description: 'Delivery start date',
            example: SwaggerConstants.Example.DATE_TIME,
            schema: {
              type: 'string',
              format: SwaggerConstants.Format.DATE_TIME,
            },
          },
          {
            name: 'delivery_stop',
            in: 'query',
            description: 'Delivery stop date',
            example: SwaggerConstants.Example.DATE_TIME,
            schema: {
              type: 'string',
              format: SwaggerConstants.Format.DATE_TIME,
            },
          },
          {
            name: 'customer',
            in: 'query',
            description: 'Customer',
            example: 'POSPPI',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: SwaggerCommon.response.reponsePageableOk(
            SwaggerConstants.Response.OK,
            '#/components/schemas/StatkraftEnobotRequest',
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
