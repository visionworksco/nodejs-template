import { AuthUtils } from '@visionworksco/nodejs-middleware';
import axios, { AxiosInstance } from 'axios';
import { Config } from '../config/Config';
import { EnvironmentUtils } from '../environment/EnvironmentUtils';

const http = (): AxiosInstance =>
  axios.create({
    baseURL: `${Config.get('AppConfig').GAPI_HOST_PREFIX}${process.env.DNS_DOMAIN}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: AuthUtils.getBasicAuthorizationHeader(
        Config.get('NGINX_USER'),
        Config.get('NGINX_PASS'),
      ),
    },
    timeout: EnvironmentUtils.isMockData() ? 2000 : Number(Config.get('AppConfig').HTTP_TIMEOUT),
    withCredentials: true,
  });

export const BaseGapiApi = {
  http,
};
