import { SwaggerCommon } from '../SwaggerCommon';
import { SwaggerConstants } from '../SwaggerConstants';

export const AmpqEnobotStrategies = {
  paths: {
    // save: addNewStrategy
    '/ampq/enobotStrategies': {
      post: {
        tags: [SwaggerConstants.Tag.AMPQ_ENOBOT_STRATEGY],
        summary: `Create enobot strategy`,
        description: `Create enobot strategy`,
        security: SwaggerCommon.schema.Security,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AmpqEnobotStrategyAddPayload',
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
