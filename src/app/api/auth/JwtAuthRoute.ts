import { AuthController, BaseAuthRoute } from '@visionworksco/nodejs-middleware';

export class JwtAuthRoute extends BaseAuthRoute {
  constructor(controller: AuthController) {
    super(controller);
  }

  getBaseUrl(): string {
    return '/auth';
  }
}
