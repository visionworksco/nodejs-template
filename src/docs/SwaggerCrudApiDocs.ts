import { SwaggerCommon } from './SwaggerCommon';
import { SwaggerConstants } from './SwaggerConstants';

type CrudScope = '*' | 'findAll' | 'findById' | 'save' | 'updateById' | 'deleteById';

export class SwaggerCrudApiDocs {
  private baseUrl: string;
  private tags: string[];
  private schemaName: string | null;
  private schemasName: string | null;
  private schemaRef: string;
  private schemaPayloadRef: string | null;
  private crudScope: CrudScope[];

  constructor(
    baseUrl: string,
    tags: string[],
    schemaName: string | null,
    schemasName: string | null,
    schemaRef: string,
    schemaPayloadRef: string | null,
    crudScope: CrudScope[],
  ) {
    this.baseUrl = baseUrl;
    this.tags = tags;
    this.schemaName = schemaName;
    this.schemasName = schemasName;
    this.schemaRef = schemaRef;
    this.schemaPayloadRef = schemaPayloadRef;
    this.crudScope = crudScope;
  }

  getPaths(): { paths: any } {
    const path = `${this.baseUrl}`;
    const pathById = `${this.baseUrl}/{id}`;
    let pathsUpdated: Record<string, any> = {};

    // findAll
    if (this.crudScope.includes('*') || this.crudScope.includes('findAll')) {
      pathsUpdated = {
        ...pathsUpdated,
        [path]: {
          ...pathsUpdated[path],
          get: {
            tags: this.tags,
            summary: `Find ${this.schemasName}`,
            description: `Find ${this.schemasName}`,
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
            ],
            responses: {
              200: SwaggerCommon.response.reponsePageableOk(
                SwaggerConstants.Response.OK,
                this.schemaRef,
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
      };
    }

    // save
    if (this.crudScope.includes('*') || this.crudScope.includes('save')) {
      pathsUpdated = {
        ...pathsUpdated,
        [path]: {
          ...pathsUpdated[path],
          post: {
            tags: this.tags,
            summary: `Create ${this.schemaName}`,
            description: `Create ${this.schemaName}`,
            security: SwaggerCommon.schema.Security,
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: this.schemaPayloadRef,
                  },
                },
              },
            },
            responses: {
              201: SwaggerCommon.response.reponseOk(
                SwaggerConstants.Response.CREATED,
                this.schemaRef,
              ),
              400: {
                $ref: '#/components/responses/400',
              },
              401: {
                $ref: '#/components/responses/401',
              },
              409: {
                $ref: '#/components/responses/409',
              },
              500: {
                $ref: '#/components/responses/500',
              },
            },
          },
        },
      };
    }

    // findById
    if (this.crudScope.includes('*') || this.crudScope.includes('findById')) {
      pathsUpdated = {
        ...pathsUpdated,
        [pathById]: {
          ...pathsUpdated[pathById],
          get: {
            tags: this.tags,
            summary: `Find ${this.schemaName} by id`,
            description: `Find ${this.schemaName} by id`,
            parameters: [
              {
                $ref: '#/components/parameters/id',
              },
            ],
            responses: {
              200: SwaggerCommon.response.reponseOk(SwaggerConstants.Response.OK, this.schemaRef),
              404: {
                $ref: '#/components/responses/404',
              },
              500: {
                $ref: '#/components/responses/500',
              },
            },
          },
        },
      };
    }

    // updateById
    if (this.crudScope.includes('*') || this.crudScope.includes('updateById')) {
      pathsUpdated = {
        ...pathsUpdated,
        [pathById]: {
          ...pathsUpdated[pathById],
          patch: {
            tags: this.tags,
            summary: `Update ${this.schemaName} by id`,
            description: `Update ${this.schemaName} by id`,
            parameters: [
              {
                $ref: '#/components/parameters/id',
              },
            ],
            security: SwaggerCommon.schema.Security,
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: this.schemaPayloadRef,
                  },
                },
              },
            },
            responses: {
              200: SwaggerCommon.response.reponseOk(SwaggerConstants.Response.OK, this.schemaRef),
              400: {
                $ref: '#/components/responses/400',
              },
              401: {
                $ref: '#/components/responses/401',
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
      };
    }

    // deleteById
    if (this.crudScope.includes('*') || this.crudScope.includes('deleteById')) {
      pathsUpdated = {
        ...pathsUpdated,
        [pathById]: {
          ...pathsUpdated[pathById],
          delete: {
            tags: this.tags,
            summary: `Delete ${this.schemaName} by id`,
            description: `Delete ${this.schemaName} by id`,
            parameters: [
              {
                $ref: '#/components/parameters/id',
              },
            ],
            security: SwaggerCommon.schema.Security,
            responses: {
              204: {
                $ref: '#/components/responses/204',
              },
              401: {
                $ref: '#/components/responses/401',
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
      };
    }

    return {
      paths: pathsUpdated,
    };
  }
}
