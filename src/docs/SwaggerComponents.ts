import { AmpqCmdExchangeMessageAction } from '../app/api/ampq/ampqCmdExchange/AmpqCmdExchangeMessageAction';
import { AmpqCmdExchangeMessageDestination } from '../app/api/ampq/ampqCmdExchange/AmpqCmdExchangeMessageDestination';
import { AmpqEnobotHbExchangeMessageModule } from '../app/api/ampq/ampqEnobotHbExchange/AmpqEnobotHbExchangeMessageModule';
import { EnobotLimitType } from '../app/api/types/EnobotLimitType';
import { EnobotSide } from '../app/api/types/EnobotSide';
import { SwaggerCommon } from './SwaggerCommon';
import { SwaggerConstants } from './SwaggerConstants';

export default {
  components: {
    /*
      parameters
    */
    parameters: {
      id: {
        name: 'id',
        in: 'path',
        required: true,
        description: SwaggerConstants.Description.UNIQUE_ID,
        example: SwaggerConstants.Example.SQL_ID,
        schema: {
          type: 'string',
          format: SwaggerConstants.Format.SQL_ID,
        },
      },
      sort: {
        name: 'sort',
        in: 'query',
        description: 'Sort by name asc and by date desc',
        example: 'name -date',
        schema: {
          type: 'string',
        },
      },
      page: {
        name: 'page',
        in: 'query',
        description: 'Page number in a pageable response',
        example: '7',
        schema: {
          type: 'string',
          format: SwaggerConstants.Format.NUMBER,
        },
      },
      pageLimit: {
        name: 'pageLimit',
        in: 'query',
        description: 'Page limit in a pageable response',
        example: '25',
        schema: {
          type: 'string',
          format: SwaggerConstants.Format.NUMBER,
          enum: ['10', '25', '50', '100'],
        },
      },
      seriesname: {
        name: 'seriesname',
        in: 'query',
        description: 'Series name',
        example: 'pblctrade',
        schema: {
          type: 'string',
        },
      },
      longname: {
        name: 'longname',
        in: 'query',
        description: 'Long name',
        example: '2021101413:45-2021101414:00',
        schema: {
          type: 'string',
        },
      },
      email: {
        name: 'email',
        in: 'path',
        required: true,
        description: 'Accout email',
        example: SwaggerConstants.Example.EMAIL,
        schema: {
          type: 'string',
          format: SwaggerConstants.Format.EMAIL,
        },
      },
    },
    /*
      securitySchemes
    */
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    /*
      schemas
    */
    schemas: {
      Error: {
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            type: 'string',
            description: SwaggerConstants.Error.ERROR_MESSAGE,
            example: 'Bad Request',
          },
        },
      },
      Paginator: {
        type: 'object',
        required: [
          'pageSizeLimit',
          'collectionSize',
          'totalPages',
          'firstPage',
          'lastPage',
          'currentPage',
        ],
        properties: {
          pageSizeLimit: {
            type: 'number',
            enum: [10, 25, 50, 100],
            description: 'Page size limit',
            example: '10',
          },
          collectionSize: {
            type: 'number',
            description: 'Collection size',
            example: '150',
          },
          pageSize: {
            type: 'number',
            description: 'Page size',
            example: '10',
          },
          totalPages: {
            type: 'number',
            description: 'Total pages',
            example: '15',
          },
          firstPage: {
            type: 'number',
            description: 'First page',
            example: '1',
          },
          lastPage: {
            type: 'number',
            description: 'Last page',
            example: '15',
          },
          currentPage: {
            type: 'number',
            description: 'Current page',
            example: '6',
          },
          nextPage: {
            type: 'number',
            nullable: true,
            description: 'Current page',
            example: '7',
          },
          previousPage: {
            type: 'number',
            nullable: true,
            description: 'Previous page',
            example: '5',
          },
        },
      },
      Info: {
        type: 'object',
        required: ['name', 'version'],
        properties: {
          name: {
            type: 'string',
            description: 'Name',
            example: 'intraday-cockpit-back',
          },
          version: {
            type: 'string',
            description: 'Version',
            example: '0.0.12',
          },
        },
      },
      Settings: {
        type: 'object',
        required: ['id'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          ...SwaggerCommon.schema.Settings.properties,
        },
      },
      SettingsPayload: {
        type: 'object',
        properties: {
          ...SwaggerCommon.schema.Settings.properties,
        },
      },
      Account: {
        type: 'object',
        required: ['id', 'name', 'email', 'password'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          ...SwaggerCommon.schema.Account.properties,
        },
      },
      AccountPayload: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          ...SwaggerCommon.schema.Account.properties,
        },
      },
      ChartWidget: {
        type: 'object',
        required: ['id', 'name', 'data'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          ...SwaggerCommon.schema.ChartWidget.properties,
        },
      },
      ChartWidgetPayload: {
        type: 'object',
        required: ['name', 'data'],
        properties: {
          ...SwaggerCommon.schema.ChartWidget.properties,
        },
      },
      ChartWidgetData: {
        type: 'object',
        required: ['series'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          name: {
            type: 'string',
            description: 'Name',
            example: 'chart1',
          },
          width: {
            type: 'string',
            enum: ['full', 'half'],
            description: 'Width',
            example: 'half',
          },
          yAxisNamePrimary: {
            type: 'string',
            description: 'Y axis name primary',
            example: 'Y primary',
          },
          yAxisNameSecondary: {
            type: 'string',
            description: 'Y axis name secondary',
            example: 'Y secondary',
          },
          tooltipEnabled: {
            type: 'boolean',
            description: 'Enable tooltip',
            example: false,
          },
          seriesMarkerEnabled: {
            type: 'boolean',
            description: 'Enable series marker',
            example: false,
          },
          dataLabelsEnabled: {
            type: 'boolean',
            description: 'Enable data labels',
            example: false,
          },
          yAxisPrimaryLabelSuffix: {
            type: 'string',
            description: 'Y axis primary label suffix',
            example: 'YP',
          },
          yAxisSecondaryLabelSuffix: {
            type: 'string',
            description: 'Y axis secondary label suffix',
            example: 'YS',
          },
          xAxisName: {
            type: 'string',
            description: 'X axis name',
            example: 'Years',
          },
          xAxisLabelSuffix: {
            type: 'string',
            description: 'X axis label suffix',
            example: 'Label',
          },
          xAxisTickInterval: {
            type: 'number',
            description: 'X axis tick interval',
            example: 10,
          },
          credits: {
            type: 'string',
            description: 'credits',
            example: 'Copyright Company',
          },
          series: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ChartSerie',
            },
          },
        },
      },
      ChartSerie: {
        type: 'object',
        required: ['id', 'values', 'valueScope'],
        properties: {
          id: {
            ...SwaggerCommon.schema.Entity.properties.id,
          },
          sourceType: {
            type: 'string',
            enum: ['GAPI', 'EPEX'],
            description: 'Source type',
            example: 'GAPI',
          },
          type: {
            type: 'string',
            enum: ['line', 'spline', 'areaspline', 'column', 'bar', 'scatter'],
            description: 'Type',
            example: 'line',
          },
          sourceName: {
            type: 'string',
            description: 'Source name',
            example: 'Meteologica',
          },
          name: {
            type: 'string',
            description: 'Name',
            example: 'PV_forecast_Meteologica_Total_latest',
          },
          longName: {
            type: 'string',
            description: 'Long Name',
            example: '20211014 13:45-20211014 14:00',
          },
          displayName: {
            type: 'string',
            description: 'Display name',
            example: 'Serie1',
          },
          displayNameType: {
            type: 'string',
            enum: ['string', 'date'],
            description: 'Display name type',
            example: 'date',
          },
          axis: {
            type: 'string',
            enum: ['primary', 'secondary'],
            description: 'axis',
            example: 'primary',
          },
          tooltipSuffix: {
            type: 'string',
            description: 'Tooltip suffix',
            example: 'C',
          },
          values: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/EnobotTimeSerie',
            },
            description: 'EnobotTimeSerie values',
          },
          valueScope: {
            type: 'string',
            nullable: true,
            enum: ['ts_tp', 'ts_tp2'],
            description: 'Value scope',
            example: 'ts_tp',
          },
        },
      },
      AccountChartWidget: {
        type: 'object',
        required: ['id', 'accountId', 'chartWidgetId'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          ...SwaggerCommon.schema.AccountChartWidget.properties,
        },
      },
      AccountChartWidgetPayload: {
        type: 'object',
        required: ['accountId', 'chartWidgetId'],
        properties: {
          ...SwaggerCommon.schema.AccountChartWidget.properties,
        },
      },
      GapiMeta: {
        type: 'object',
        required: [
          'id',
          'source',
          'name',
          'bucket-size',
          'table',
          'description',
          'unit',
          'interval',
        ],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          source: {
            type: 'string',
            nullable: true,
            description: 'Source',
            example: 'Ramps',
          },
          name: {
            type: 'string',
            nullable: true,
            description: 'Name',
            example: 'TE01_X_ID_Ramp_LU',
          },
          ['bucket-size']: {
            type: 'number',
            nullable: true,
            description: 'Bucket size',
            example: null,
          },
          table: {
            type: 'string',
            nullable: true,
            description: 'Table',
            example: 'ts_tp',
          },
          description: {
            type: 'string',
            nullable: true,
            description: 'Description',
            example: null,
          },
          unit: {
            type: 'number',
            nullable: true,
            description: 'Unit',
            example: null,
          },
          interval: {
            type: 'number',
            nullable: true,
            description: 'Interval',
            example: null,
          },
        },
      },
      EnobotTimeSerie: {
        type: 'object',
        required: ['id', 'ts', 'value'],
        properties: {
          ts: {
            type: 'string',
            nullable: true,
            description: 'ts',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          value: {
            type: 'number',
            nullable: true,
            description: 'value',
            example: 145,
          },
          ts2: {
            type: 'string',
            nullable: true,
            description: 'ts2',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          value2: {
            type: 'number',
            nullable: true,
            description: 'value2',
            example: 145,
          },
        },
      },
      AmpqEnobotOrder: {
        type: 'object',
        required: [
          'id',
          'customer',
          'requestID',
          'grid',
          'volume',
          'priceCent',
          'duration',
          'localDateTime',
          'strategy',
        ],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          ...SwaggerCommon.schema.AmpqEnobotOrder.properties,
        },
      },
      AmpqEnobotOrderLimit: {
        type: 'object',
        required: [
          'id',
          'type',
          'info',
          'author',
          'savedDate',
          'expirationDate',
          'activationDate',
          'activationUser',
          'orders',
          'deleted',
        ],
        properties: {
          id: {
            type: 'string',
            nullable: true,
            format: SwaggerConstants.Format.UUID,
            description: 'Id',
            example: SwaggerConstants.Example.UUID,
          },
          type: {
            type: 'string',
            enum: ['MinPrice', 'MaxPrice'] as EnobotLimitType[],
            description: 'Type',
            example: 'MinPrice' as EnobotLimitType,
          },
          info: {
            $ref: '#/components/schemas/AmpqEnobotOrderLimitInfo',
            nullable: true,
          },
          author: {
            type: 'string',
            description: 'Author',
            example: SwaggerConstants.Example.EMAIL,
          },
          savedDate: {
            type: 'number',
            description: 'Creation date in ms',
            example: SwaggerConstants.Example.DATE_TIME_MS,
          },
          expirationDate: {
            type: 'number',
            description: 'Expiration date in ms',
            example: SwaggerConstants.Example.DATE_TIME_MS,
          },
          activationDate: {
            type: 'string',
            format: SwaggerConstants.Format.DATE_TIME,
            description: 'Activation date',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          activationUser: {
            type: 'string',
            description: 'Activation user',
            example: SwaggerConstants.Example.EMAIL,
          },
          orders: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AmpqEnobotOrder',
            },
          },
          deleted: {
            type: 'number',
            description: 'Is deleted',
            enum: [0, 1],
            example: 0,
          },
        },
      },
      AmpqEnobotOrderLimitInfo: {
        type: 'object',
        required: ['ts', 'duration', 'grid'],
        properties: {
          ts: {
            type: 'string',
            format: SwaggerConstants.Format.DATE_TIME,
            description: 'ts',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          duration: {
            type: 'number',
            description: 'Number of quarters in an hour',
            example: 4,
          },
          grid: {
            type: 'string',
            description: 'Grid',
            example: SwaggerConstants.Example.SIDE,
          },
          minBuyPrice: {
            type: 'number',
            description: 'Minimum buying price (EUR)',
            example: 12.2,
          },
          maxBuyPrice: {
            type: 'number',
            description: 'Minimum buying price (EUR)',
            example: 15.7,
          },
        },
      },
      AmpqEnobotOrderAddPayload: {
        type: 'object',
        required: ['orders', 'limit'],
        properties: {
          orders: {
            type: 'array',
            nullable: true,
            items: {
              $ref: '#/components/schemas/AmpqEnobotOrder',
            },
          },
          limit: {
            type: 'array',
            nullable: true,
            items: {
              $ref: '#/components/schemas/AmpqEnobotOrderLimit',
            },
          },
        },
      },
      AmpqEnobotOrderDeletePayload: {
        type: 'object',
        required: ['orderIds', 'user'],
        properties: {
          orderIds: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'Order ids',
            example: [SwaggerConstants.Example.UUID],
          },
          user: {
            type: 'string',
            description: 'User',
            example: SwaggerConstants.Example.EMAIL,
          },
        },
      },
      AmpqEnobotStrategyAddPayload: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'array',
            nullable: true,
            items: {
              $ref: '#/components/schemas/MuleEnobotStrategy',
            },
          },
        },
      },
      AmpqEnobotCustomerStrategyEditPayload: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            type: 'array',
            nullable: true,
            items: {
              $ref: '#/components/schemas/AmpqEnobotCustomerStrategy',
            },
          },
        },
      },
      AmpqEnobotCustomerStrategy: {
        type: 'object',
        required: [
          'id',
          'customer',
          'side',
          'dlvryAreaId',
          'strategyID',
          'author',
          'savedDate',
          'deleted',
          'note',
        ],
        properties: {
          id: {
            type: 'string',
            nullable: true,
            format: SwaggerConstants.Format.UUID,
            description: 'Id',
            example: SwaggerConstants.Example.UUID,
          },
          customer: {
            type: 'string',
            description: 'customer',
            example: SwaggerConstants.Example.CUSTOMER,
          },
          side: {
            type: 'string',
            enum: ['SELL', 'BUY'] as EnobotSide[],
            description: 'Side',
            example: 'SELL',
          },
          dlvryAreaId: {
            type: 'string',
            description: 'Delivery Area Id',
            example: SwaggerConstants.Example.SIDE,
          },
          strategyID: {
            type: 'string',
            description: 'Strategy Id',
            example: SwaggerConstants.Example.UUID,
          },
          author: {
            type: 'string',
            description: 'Author',
            example: SwaggerConstants.Example.EMAIL,
          },
          savedDate: {
            type: 'number',
            description: 'Creation date in ms',
            example: SwaggerConstants.Example.DATE_TIME_MS,
          },
          deleted: {
            type: 'number',
            enum: [0, 1],
            description: 'Is deleted',
            example: 0,
          },
          note: {
            type: 'string',
            nullable: true,
            description: 'Note',
            example: SwaggerConstants.Example.NOTE,
          },
        },
      },
      AmpqCmdExchangeMessage: {
        type: 'object',
        required: ['id', 'timestamp', 'to', 'from', 'action', 'arguments', 'linkedMsg'],
        properties: {
          id: {
            type: 'string',
            format: SwaggerConstants.Format.UUID,
            description: 'Id',
            example: SwaggerConstants.Example.UUID,
          },
          timestamp: {
            type: 'string',
            format: SwaggerConstants.Format.DATE_TIME,
            description: 'Time stamp',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          to: {
            type: 'string',
            enum: [
              'phm',
              'rsik',
              'con',
              'stromtanke',
              'cockpit',
            ] as AmpqCmdExchangeMessageDestination[],
            description: 'To',
            example: 'stromtanke',
          },
          from: {
            type: 'string',
            enum: [
              'phm',
              'rsik',
              'con',
              'stromtanke',
              'cockpit',
            ] as AmpqCmdExchangeMessageDestination[],
            description: 'From',
            example: 'cockpit',
          },
          action: {
            type: 'string',
            enum: [
              'addNewOrder',
              'addNewLimitOrder',
              'deleteLimitOrder',
              'addNewStrategy',
              'addNewCustomerStrategyIDMP',
            ] as AmpqCmdExchangeMessageAction[],
            description: 'Action',
            example: 'addNewOrder',
          },
          arguments: {
            type: 'string',
            nullable: true,
            description: 'Arguments',
            example:
              '[{"id":"","customer":"SPEC","requestID":"Kzt8qIu2Q5hVIidxj0E4k","grid":"RWE","volume":20,"priceCent":null,"duration":1,"localDateTime":"2021-10-31T20:10:41.551Z","strategy":null}]',
          },
          linkedMsg: {
            type: 'string',
            nullable: true,
            format: SwaggerConstants.Format.UUID,
            description: 'Linked message id',
            example: SwaggerConstants.Example.UUID,
          },
        },
      },
      CmdExchangeLog: {
        type: 'object',
        required: ['id', 'data'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          data: {
            $ref: '#/components/schemas/AmpqCmdExchangeMessage',
          },
        },
      },
      StatkraftEnobotRequest: {
        type: 'object',
        required: ['id', 'ts', 'customer', 'requestid', 'grid', 'volume', 'saved'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          ts: {
            type: 'string',
            nullable: true,
            format: SwaggerConstants.Format.DATE_TIME,
            description: 'ts',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          customer: {
            type: 'string',
            nullable: true,
            description: 'Customer',
            example: SwaggerConstants.Example.CUSTOMER,
          },
          requestid: {
            type: 'string',
            nullable: true,
            description: 'Request Id',
            example: '20210812_POSPPI_GENERATED_REQUEST0.CSV',
          },
          grid: {
            type: 'string',
            nullable: true,
            description: 'Grid',
            example: SwaggerConstants.Example.SIDE,
          },
          volume: {
            type: 'number',
            nullable: true,
            description: 'Volume',
            example: 12.4,
          },
          saved: {
            type: 'string',
            nullable: true,
            enum: ['0', '1'],
            description: 'Is saved',
            example: '0',
          },
        },
      },
      Heartbeats: {
        type: 'object',
        required: ['id', 'module', 'server', 'timeStamp'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          module: {
            type: 'string',
            nullable: true,
            enum: [
              'stromtanke',
              'arb',
              'arb/epex',
              'cgza',
              'cgza/epex',
              'con',
              'con/epex',
              'risk',
              'risk/epex',
              'phm',
              'phm/epex',
            ] as AmpqEnobotHbExchangeMessageModule[],
            description: 'Module',
            example: 'stromtanke',
          },
          server: {
            type: 'string',
            nullable: true,
            description: 'Server',
            example: 'top02',
          },
          timeStamp: {
            type: 'string',
            nullable: true,
            format: SwaggerConstants.Format.DATE_TIME,
            description: 'Time stamp',
            example: SwaggerConstants.Example.DATE_TIME,
          },
        },
      },
      MuleEnobotStrategyData: {
        type: 'object',
        required: ['pr', 'steps', 'enoStart', 'enoEnd', 'volumes', 'timeSteps'],
        properties: {
          pr: {
            type: 'array',
            items: {
              type: 'number',
            },
            nullable: true,
            description: 'pr',
            example: [0.5, 0.5, 0.5, 0.5, 0.5],
          },
          steps: {
            type: 'number',
            nullable: true,
            description: 'Steps',
            example: 5,
          },
          enoStart: {
            type: 'number',
            nullable: true,
            description: 'Eno start',
            example: null,
          },
          enoEnd: {
            type: 'number',
            nullable: true,
            description: 'Eno end',
            example: 1800,
          },
          volumes: {
            type: 'array',
            items: {
              type: 'number',
            },
            nullable: true,
            description: 'Volumes',
            example: [20, 20, 20, 20, 20],
          },
          timeSteps: {
            type: 'array',
            items: {
              type: 'number',
            },
            nullable: true,
            description: 'Time steps',
            example: [20, 20, 20, 20, 20],
          },
        },
      },
      MuleEnobotStrategy: {
        type: 'object',
        required: ['id', 'strategy', 'name', 'author', 'saveDate', 'note'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          strategy: {
            $ref: '#/components/schemas/MuleEnobotStrategyData',
            nullable: true,
          },
          name: {
            type: 'string',
            nullable: true,
            description: 'Name',
            example: 'Default',
          },
          author: {
            type: 'string',
            nullable: true,
            description: 'Author',
            example: SwaggerConstants.Example.EMAIL,
          },
          saveDate: {
            oneOf: [{ type: 'string' }, { type: 'number' }],
            nullable: true,
            description: 'Save date',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          note: {
            type: 'string',
            nullable: true,
            description: 'Note',
            example: 'Immediate closing of the position',
          },
        },
      },
      MuleEnobotCustomerStrategy: {
        type: 'object',
        required: [
          'id',
          'customer',
          'side',
          'dlvryAreaId',
          'strategyID',
          'strategy',
          'strategy',
          'name',
          'strategyNote',
          'deleted',
          'author',
          'saveDate',
          'MappingNote',
        ],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          customer: {
            type: 'string',
            nullable: true,
            description: 'Customer',
            example: SwaggerConstants.Example.CUSTOMER,
          },
          side: {
            type: 'string',
            nullable: true,
            enum: ['SELL', 'BUY'] as EnobotSide[],
            description: 'Side',
            example: 'SELL',
          },
          dlvryAreaId: {
            type: 'string',
            nullable: true,
            description: 'Delivery AreaId',
            example: 'RWE',
          },
          strategyID: {
            type: 'string',
            nullable: true,
            description: 'Strategy ID',
            example: SwaggerConstants.Example.UUID,
          },
          strategy: {
            $ref: '#/components/schemas/MuleEnobotStrategyData',
            nullable: true,
          },
          name: {
            type: 'string',
            nullable: true,
            description: 'Name',
            example: 'Default',
          },
          strategyNote: {
            type: 'string',
            nullable: true,
            description: 'Strategy note',
            example: 'Immediate closing of the position',
          },
          deleted: {
            type: 'number',
            enum: [0, 1],
            description: 'Is deleted',
            example: 0,
          },
          author: {
            type: 'string',
            nullable: true,
            description: 'Author',
            example: SwaggerConstants.Example.EMAIL,
          },
          savedDate: {
            type: 'string',
            nullable: true,
            description: 'Creation date in ms',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          MappingNote: {
            type: 'string',
            nullable: true,
            description: 'Mapping note',
            example: 'Immediate closing of the position',
          },
        },
      },
      MuleEnobotRequest: {
        type: 'object',
        required: [
          'id',
          'type',
          'activationDate',
          'activationUser',
          'expirationDate',
          'orders',
          'info',
          'author',
          'savedDate',
          'deleted',
        ],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          type: {
            type: 'string',
            nullable: true,
            enum: ['MinPrice', 'MaxPrice'] as EnobotLimitType[],
            description: 'Type',
            example: 'MinPrice' as EnobotLimitType,
          },
          activationDate: {
            type: 'string',
            nullable: true,
            format: SwaggerConstants.Format.DATE_TIME,
            description: 'Activation date',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          activationUser: {
            type: 'string',
            nullable: true,
            description: 'Activation user',
            example: SwaggerConstants.Example.EMAIL,
          },
          expirationDate: {
            type: 'number',
            nullable: true,
            description: 'Expiration date in ms',
            example: SwaggerConstants.Example.DATE_TIME_MS,
          },
          orders: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/MuleEnobotOrder',
            },
          },
          info: {
            $ref: '#/components/schemas/MuleEnobotOrderLimitInfo',
            nullable: true,
          },
          author: {
            type: 'string',
            nullable: true,
            description: 'Author',
            example: SwaggerConstants.Example.EMAIL,
          },
          savedDate: {
            type: 'string',
            nullable: true,
            description: 'Creation date in ms',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          deleted: {
            type: 'number',
            description: 'Is deleted',
            enum: [0, 1],
            example: 0,
          },
        },
      },
      MuleEnobotOrder: {
        type: 'object',
        required: [
          'id',
          'requestID',
          'customer',
          'grid',
          'volume',
          'priceCent',
          'duration',
          'localReqDate',
          'strategy',
        ],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          requestID: {
            type: 'string',
            nullable: true,
            format: SwaggerConstants.Format.UUID,
            description: 'Request id',
            example: SwaggerConstants.Example.UUID,
          },
          customer: {
            type: 'string',
            nullable: true,
            description: 'Customer',
            example: SwaggerConstants.Example.CUSTOMER,
          },
          grid: {
            type: 'string',
            nullable: true,
            description: 'Grid',
            example: SwaggerConstants.Example.SIDE,
          },
          volume: {
            type: 'number',
            nullable: true,
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
            nullable: true,
            description: 'Number of quarters in an hour',
            example: 4,
          },
          localReqDate: {
            type: 'string',
            nullable: true,
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
      },
      MuleEnobotOrderLimitInfo: {
        type: 'object',
        required: ['ts', 'duration', 'grid', 'minSellPrice'],
        properties: {
          ts: {
            type: 'string',
            nullable: true,
            format: SwaggerConstants.Format.DATE_TIME,
            description: 'ts',
            example: SwaggerConstants.Example.DATE_TIME,
          },
          duration: {
            type: 'number',
            nullable: true,
            description: 'Number of quarters in an hour',
            example: 4,
          },
          grid: {
            type: 'string',
            nullable: true,
            description: 'Grid',
            example: SwaggerConstants.Example.SIDE,
          },
          minSellPrice: {
            type: 'number',
            nullable: true,
            description: 'Minimum selling price (EUR)',
            example: 12.2,
          },
        },
      },
      MuleEpexMeta: {
        type: 'object',
        required: ['id', 'seriesname', 'table'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          seriesname: {
            type: 'string',
            nullable: true,
            description: 'Series name',
            example: 'full_avg',
          },
          table: {
            type: 'string',
            nullable: true,
            description: 'Table',
            example: 'avg',
          },
        },
      },
      MuleEpexAvg: {
        type: 'object',
        required: ['id', 'longname', 'seriesname', 'grid', 'price'],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          longname: {
            type: 'string',
            nullable: true,
            description: 'Long name',
            example: '20211014 13:45-20211014 14:00',
          },
          seriesname: {
            type: 'string',
            nullable: true,
            description: 'Series name',
            example: 'id3',
          },
          grid: {
            type: 'string',
            nullable: true,
            description: 'Grid',
            example: SwaggerConstants.Example.SIDE,
          },
          price: {
            type: 'number',
            nullable: true,
            description: 'Price',
            example: 2993,
          },
        },
      },
      MuleEpexObContract: {
        type: 'object',
        required: [
          'id',
          'seriesname',
          'longname',
          'prod',
          'grid',
          'dlvryend',
          'contractid',
          'ask',
          'dlvrystart',
          'bid',
          'ts',
        ],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          seriesname: {
            type: 'string',
            nullable: true,
            description: 'Series name',
            example: 'top',
          },
          longname: {
            type: 'string',
            nullable: true,
            description: 'Long name',
            example: '20211014 13:45-20211014 14:00',
          },
          prod: {
            type: 'string',
            nullable: true,
            description: 'Prod',
            example: 'Intraday_Quarter_Hour_Power',
          },
          grid: {
            type: 'string',
            nullable: true,
            description: 'Grid',
            example: SwaggerConstants.Example.SIDE,
          },
          dlvryend: {
            type: 'string',
            nullable: true,
            description: 'Delivery end date',
            example: '2021-10-14T12:00:00',
          },
          contractid: {
            type: 'number',
            nullable: true,
            description: 'Contract Id',
            example: 837261,
          },
          ask: {
            type: 'number',
            nullable: true,
            description: 'Ask',
            example: 16240,
          },
          dlvrystart: {
            type: 'string',
            nullable: true,
            description: 'Delivery start date',
            example: '2021-10-14T11:45:00',
          },
          bid: {
            type: 'number',
            nullable: true,
            description: 'Bid',
            example: 16140,
          },
          ts: {
            type: 'string',
            nullable: true,
            description: 'Ts',
            example: '2021-10-14T11:31:53.854',
          },
        },
      },
      MuleEpexPublicTradeContract: {
        type: 'object',
        required: [
          'id',
          'longname',
          'prod',
          'selftrade',
          'buydlvryareaid',
          'dlvrystart',
          'px',
          'clghsecode',
          'seriesname',
          'selldlvryareaid',
          'tradeexectime',
          'dlvryend',
          'qty',
          'contractid',
          'revisionno',
          'state',
          'tradeid',
        ],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          longname: {
            type: 'string',
            nullable: true,
            description: 'Long name',
            example: '20211014 13:45-20211014 14:00',
          },
          prod: {
            type: 'string',
            nullable: true,
            description: 'Prod',
            example: 'XBID_Quarter_Hour_Power',
          },
          selftrade: {
            type: 'string',
            nullable: true,
            description: 'Is self trade',
            example: 'true',
          },
          buydlvryareaid: {
            type: 'string',
            nullable: true,
            description: 'Buy delivery area id',
            example: '10YDE-RWENET---I',
          },
          dlvrystart: {
            type: 'string',
            nullable: true,
            description: 'Delivery start date',
            example: '2021-10-14T11:45:00',
          },
          px: {
            type: 'number',
            nullable: true,
            description: 'Px',
            example: 3530,
          },
          clghsecode: {
            type: 'string',
            nullable: true,
            description: 'Clghse code',
            example: '',
          },
          seriesname: {
            type: 'string',
            nullable: true,
            description: 'Series name',
            example: 'pblctrade',
          },
          selldlvryareaid: {
            type: 'string',
            nullable: true,
            description: 'Sell delivery area id',
            example: '10YDE-VE-------2',
          },
          tradeexectime: {
            type: 'string',
            nullable: true,
            description: 'Trade execution time',
            example: '2021-10-13T19:00:27.673',
          },
          dlvryend: {
            type: 'string',
            nullable: true,
            description: 'Delivery end date',
            example: '2021-10-14T12:00:00',
          },
          qty: {
            type: 'number',
            nullable: true,
            description: 'Quantity',
            example: 1000,
          },
          contractid: {
            type: 'number',
            nullable: true,
            description: 'Contract Id',
            example: 837276,
          },
          revisionno: {
            type: 'number',
            nullable: true,
            description: 'Revision number',
            example: 1,
          },
          state: {
            type: 'string',
            nullable: true,
            description: 'State',
            example: 'ACTI',
          },
          tradeid: {
            type: 'number',
            nullable: true,
            description: 'Trade Id',
            example: 47509857,
          },
        },
      },
    },
    /*
      responses
    */
    responses: {
      204: {
        description: SwaggerConstants.Response.NO_CONTENT,
      },
      400: {
        description: SwaggerConstants.Response.BAD_REQUEST,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['error'],
              properties: {
                error: {
                  type: 'string',
                  description: SwaggerConstants.Error.ERROR_MESSAGE,
                  example: 'groups must be an array; permissions must be an array;',
                },
              },
            },
          },
        },
      },
      401: {
        description: SwaggerConstants.Response.UNAUTHORIZED,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['error'],
              properties: {
                error: {
                  type: 'string',
                  enum: [
                    'Misssing authentication token',
                    'Invalid authentication token',
                    'Invalid credentials',
                    'Invalid access',
                  ],
                  description: SwaggerConstants.Error.ERROR_MESSAGE,
                  example: 'Misssing authentication token',
                },
              },
            },
          },
        },
      },
      404: {
        description: SwaggerConstants.Response.NOT_FOUND,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['error'],
              properties: {
                error: {
                  type: 'string',
                  enum: [SwaggerConstants.Response.NOT_FOUND],
                  description: SwaggerConstants.Error.ERROR_MESSAGE,
                  example: SwaggerConstants.Response.NOT_FOUND,
                },
              },
            },
          },
        },
      },
      409: {
        description: SwaggerConstants.Response.CONFLICT,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['error'],
              properties: {
                error: {
                  type: 'string',
                  enum: [SwaggerConstants.Response.ITEM_ALREADY_EXISTS],
                  description: SwaggerConstants.Error.ERROR_MESSAGE,
                  example: SwaggerConstants.Response.ITEM_ALREADY_EXISTS,
                },
              },
            },
          },
        },
      },
      500: {
        description: SwaggerConstants.Response.INTERNAL_SERVER_ERROR,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['error'],
              properties: {
                error: {
                  type: 'string',
                  enum: [SwaggerConstants.Response.INTERNAL_SERVER_ERROR],
                  description: SwaggerConstants.Error.ERROR_MESSAGE,
                  example: SwaggerConstants.Response.INTERNAL_SERVER_ERROR,
                },
              },
            },
          },
        },
      },
    },
  },
};
