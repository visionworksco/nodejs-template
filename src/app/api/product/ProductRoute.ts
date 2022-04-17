import {
  AuthData,
  Authenticate,
  AuthorizeDefault,
  AuthorizeUser,
  AuthService,
  BaseCrudController,
  BaseCrudRoute,
} from '@visionworksco/nodejs-middleware';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Context } from '../../context/Context';
import { Authenticated } from '../../role/default/Authenticated';
import { Public } from '../../role/default/Public';
import { FileController } from '../file/FileController';
import { UserEntity } from '../user/UserEntity';
import { ProductEntity } from './ProductEntity';

export class ProductRoute extends BaseCrudRoute<ProductEntity> {
  private authService: AuthService<UserEntity, AuthData>;
  private fileController: FileController;
  private permissionSchemaId: string;

  constructor(
    controller: BaseCrudController<ProductEntity>,
    fileController: FileController,
    authService: AuthService<UserEntity, AuthData>,
  ) {
    super(controller);
    this.fileController = fileController;
    this.authService = authService;
    this.permissionSchemaId = 'product';

    this.registerAdditionalRoutes();
  }

  private registerAdditionalRoutes() {
    this.router.post(`${this.getBaseUrl()}/upload`, [this.upload]);
  }

  private upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.fileController.upload(req, res);
    } catch (error) {
      next(error);
    }
  };

  getBaseUrl(): string {
    return '/products';
  }

  protected saveHandlers = (handlerId?: string): RequestHandler[] => [
    Authenticate(this.authService),
    AuthorizeUser(Context.getInstance().applicationRoles, this.permissionSchemaId, handlerId),
    this.save,
  ];

  protected updateByIdHandlers = (handlerId?: string): RequestHandler[] => [
    AuthorizeDefault(Public, this.permissionSchemaId, handlerId),
    Authenticate(this.authService),
    AuthorizeDefault(Authenticated, this.permissionSchemaId, handlerId),
    AuthorizeUser(Context.getInstance().applicationRoles, this.permissionSchemaId, handlerId),
    this.updateById,
  ];

  protected deleteByIdHandlers = (handlerId?: string): RequestHandler[] => [
    Authenticate(this.authService),
    AuthorizeUser(Context.getInstance().applicationRoles, this.permissionSchemaId, handlerId),
    this.deleteById,
  ];
}
