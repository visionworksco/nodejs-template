import {
  AccessTokenManager,
  AuthUser,
  BaseRequest,
  ServerException,
} from '@visionworksco/nodejs-middleware';
import { NextFunction, RequestHandler, Response } from 'express';
import { AccessTokenParser } from '../../../token/AccessTokenParser';

export const Authenticate =
  (): RequestHandler => (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const token = AccessTokenManager.getFromRequest(req);
      const accessTokenParser = new AccessTokenParser(token);
      const accessTokenPayload = accessTokenParser.toPayload();
      if (!accessTokenPayload) {
        throw ServerException.InvalidAuthenticationTokenException();
      }

      const authUser = {
        id: accessTokenPayload.client_id,
        email: accessTokenPayload.email,
        password: '',
      } as AuthUser;

      req.user = authUser;
      next();
    } catch (error) {
      next(error);
    }
  };
