import { SwaggerConstants } from './SwaggerConstants';

const Security = [{ bearerAuth: [] }];

const Entity = {
  properties: {
    id: {
      type: 'string',
      format: SwaggerConstants.Format.MONGODB_ID,
      description: SwaggerConstants.Description.UNIQUE_ID,
      example: SwaggerConstants.Example.MONGODB_ID,
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

const Product = {
  properties: {
    name: {
      type: 'string',
      description: 'Name',
      example: 'Airpods',
    },
    image: {
      type: 'string',
      description: 'Image path',
      example: '/assets/images/airpods.jpg',
    },
    description: {
      type: 'string',
      description: 'Description',
      example: 'Product description...',
    },
    brand: {
      type: 'string',
      description: 'Brand',
      example: 'Apple',
    },
    category: {
      type: 'string',
      description: 'Category',
      example: 'Electronics',
    },
    price: {
      type: 'number',
      description: 'Price',
      example: '95.99',
    },
    countInStock: {
      type: 'number',
      description: 'Count in stock',
      example: '45',
    },
    rating: {
      type: 'number',
      description: 'rating',
      example: 4.5,
    },
    numReviews: {
      type: 'number',
      description: 'Number of reviews',
      example: 12,
    },
    user: {
      type: 'string',
      description: 'User id',
      example: SwaggerConstants.Example.MONGODB_ID,
    },
    reviews: {
      type: 'array',
      nullable: true,
      items: {
        type: 'string',
        description: 'Review id',
        example: SwaggerConstants.Example.MONGODB_ID,
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
    Product,
  },
  response: {
    reponseOk,
    reponsePageableOk,
  },
};
