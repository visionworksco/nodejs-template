import { AuthUser } from '@visionworksco/nodejs-middleware';

export interface Account extends AuthUser {
  name: string;
  groups?: string[];
  permissions?: string[];
}
