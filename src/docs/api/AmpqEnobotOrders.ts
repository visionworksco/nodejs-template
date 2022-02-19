import { SwaggerCommon } from '../SwaggerCommon';
import { SwaggerConstants } from '../SwaggerConstants';

export const AmpqEnobotOrders = {
  paths: {
    // save: addNewOrder or addNewLimitOrder
    '/ampq/enobotOrders/addOrder': {
      post: {
        tags: [SwaggerConstants.Tag.AMPQ_ENOBOT_ORDER],
        summary: `Create enobot order or limit order`,
        description: `Create enobot order or limit order`,
        security: SwaggerCommon.schema.Security,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AmpqEnobotOrderAddPayload',
              },
            },
          },
        },
        responses: {
          201: {
            description: SwaggerConstants.Response.CREATED,
          },
          400: {
            $ref: '#/components/responses/400',
          },
          401: {
            $ref: '#/components/responses/401',
          },
          500: {
            $ref: '#/components/responses/500',
          },
        },
      },
    },
    // save: deleteLimitOrder
    '/ampq/enobotOrders/deleteOrder': {
      post: {
        tags: [SwaggerConstants.Tag.AMPQ_ENOBOT_ORDER],
        summary: `Delete enobot limit order (deleteLimitOrder)`,
        description: `Delete enobot limit order (deleteLimitOrder)`,
        security: SwaggerCommon.schema.Security,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AmpqEnobotOrderDeletePayload',
              },
            },
          },
        },
        responses: {
          201: {
            description: SwaggerConstants.Response.CREATED,
          },
          400: {
            $ref: '#/components/responses/400',
          },
          401: {
            $ref: '#/components/responses/401',
          },
          500: {
            $ref: '#/components/responses/500',
          },
        },
      },
    },
  },
};
