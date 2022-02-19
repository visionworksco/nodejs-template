import { AuthUser } from '@visionworksco/expressjs-middleware';

export interface Account extends AuthUser {
  name: string;
  groups?: string[];
  permissions?: string[];
}
