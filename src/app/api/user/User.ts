import { AuthUser } from '@visionworksco/nodejs-middleware';
import { ApplicationRole } from '../../role/application/ApplicationRole';

export interface User extends AuthUser {
  name: string;
  roles?: ApplicationRole[];
}
