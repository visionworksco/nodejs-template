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
      Product: {
        type: 'object',
        required: [
          'id',
          'name',
          'image',
          'description',
          'brand',
          'category',
          'price',
          'countInStock',
          'rating',
          'numReviews',
          'user',
        ],
        properties: {
          ...SwaggerCommon.schema.Entity.properties,
          ...SwaggerCommon.schema.Product.properties,
        },
      },
      ProductPayload: {
        type: 'object',
        required: [
          'name',
          'image',
          'description',
          'brand',
          'category',
          'price',
          'countInStock',
          'rating',
          'numReviews',
          'user',
        ],
        properties: {
          ...SwaggerCommon.schema.Product.properties,
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
