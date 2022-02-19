import { EnobotLimitType } from '../app/api/types/EnobotLimitType';
import { SwaggerConstants } from './SwaggerConstants';

const Security = [{ bearerAuth: [] }];

const Entity = {
  properties: {
    id: {
      type: 'string',
      format: SwaggerConstants.Format.SQL_ID,
      description: SwaggerConstants.Description.UNIQUE_ID,
      example: SwaggerConstants.Example.SQL_ID,
    },
    createdAt: {
      type: 'string',
      format: SwaggerConstants.Format.DATE_TIME,
      description: 'Date of creation',
      example: SwaggerConstants.Example.DATE_TIME,
    },
    createdBy: {
      type: 'string',
      description: 'Creator',
      example: SwaggerConstants.Example.EMAIL,
    },
    updatedAt: {
      type: 'string',
      format: SwaggerConstants.Format.DATE_TIME,
      description: 'Date of change',
      example: SwaggerConstants.Example.DATE_TIME,
    },
    updatedBy: {
      type: 'string',
      description: 'Editor',
      example: SwaggerConstants.Example.EMAIL,
    },
  },
};

const Account = {
  properties: {
    name: {
      type: 'string',
      description: 'Name',
      example: SwaggerConstants.Example.NAME,
    },
    email: {
      type: 'string',
      format: SwaggerConstants.Format.EMAIL,
      description: 'Email',
      example: SwaggerConstants.Example.EMAIL,
    },
    password: {
      type: 'string',
      format: SwaggerConstants.Format.PASSWORD,
      description: 'Password. Always empty.',
      example: '',
    },
    groups: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Groups',
      example: ['intraday-cockpit-admins'],
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Permissions',
      example: ['appAdmin:intraday-cockpit', 'intraday-cockpit'],
    },
    roles: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Roles',
      example: ['intraday-cockpit'],
    },
  },
};

const ChartWidget = {
  properties: {
    name: {
      type: 'string',
      description: 'Name',
      example: 'chart1',
    },
    data: {
      $ref: '#/components/schemas/ChartWidgetData',
    },
  },
};

const AccountChartWidget = {
  properties: {
    accountId: {
      type: 'number',
      description: 'Account id',
      example: '1',
    },
    chartWidgetId: {
      type: 'number',
      description: 'Chart widget id',
      example: '2',
    },
  },
};

const AmpqEnobotOrder = {
  properties: {
    customer: {
      type: 'string',
      description: 'Customer',
      example: 'TM',
    },
    requestID: {
      type: 'string',
      format: SwaggerConstants.Format.UUID,
      description: 'Request id',
      example: SwaggerConstants.Example.UUID,
    },
    grid: {
      type: 'string',
      description: 'Grid',
      example: 'RWE',
    },
    volume: {
      type: 'number',
      description: 'Volume (Mw)',
      example: 15.4,
    },
    priceCent: {
      type: 'number',
      nullable: true,
      description: 'Price in cents (EUR)',
      example: null,
    },
    duration: {
      type: 'number',
      description: 'Number of quarters in an hour',
      example: 4,
    },
    localDateTime: {
      type: 'string',
      format: SwaggerConstants.Format.DATE_TIME,
      description: 'Local datetime',
      example: SwaggerConstants.Example.DATE_TIME,
    },
    strategy: {
      type: 'string',
      nullable: true,
      description: 'Strategy',
      example: null,
    },
  },
};

const Settings = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        enobotRequest: {
          type: 'object',
          properties: {
            grid: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Grid',
              example: ['RWE', 'EON', 'ENBW', 'VE'],
            },
            volumeMin: {
              type: 'number',
              description: 'Volume minimum',
              example: 0.1,
            },
            volumeMax: {
              type: 'number',
              description: 'Volume maximum',
              example: 50,
            },
            duration: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Duration',
              example: ['15min', '1h'],
            },
            limitType: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Limit type',
              example: ['MaxPrice', 'MinPrice'] as EnobotLimitType[],
            },
          },
        },
      },
    },
  },
};

const reponseOk = (description: string, schemaRef: string): any => {
  return {
    description,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              $ref: schemaRef,
            },
            error: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  };
};

const reponsePageableOk = (description: string, schemaRef: string): any => {
  return {
    description: description,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['data', 'paginator'],
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: schemaRef,
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
  };
};

export const SwaggerCommon = {
  schema: {
    Entity,
    Security,
    Account,
    ChartWidget,
    AccountChartWidget,
    AmpqEnobotOrder,
    Settings,
  },
  response: {
    reponseOk,
    reponsePageableOk,
  },
};
