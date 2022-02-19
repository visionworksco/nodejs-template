import { SwaggerCommon } from '../SwaggerCommon';
import { SwaggerConstants } from '../SwaggerConstants';

export const AmpqEnobotCustomerStrategies = {
  paths: {
    // save: editStrategy
    '/ampq/enobotCustomerStrategies/editStrategy': {
      post: {
        tags: [SwaggerConstants.Tag.AMPQ_ENOBOT_CUSTOMER_STRATEGY],
        summary: `Edit enobot customer strategy`,
        description: `Edit enobot customer strategy`,
        security: SwaggerCommon.schema.Security,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AmpqEnobotCustomerStrategyEditPayload',
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
