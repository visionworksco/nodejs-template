import { BaseTokenPayload } from './BaseTokenPayload';

export interface AccessTokenPayload extends BaseTokenPayload {
  client_id: string;
  email: string;
  grantId: string;
  jti: string;
  scope: string;
  'urn:one-auth:groups': string[];
  'urn:one-auth:intraday-cockpit:permissions': string[];
  'urn:one-auth:intraday-cockpit:roles': string[];
}
