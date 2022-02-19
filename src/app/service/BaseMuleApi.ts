import axios, { AxiosInstance } from 'axios';
import { Config } from '../config/Config';
import { EnvironmentUtils } from '../environment/EnvironmentUtils';

const http = (): AxiosInstance =>
  axios.create({
    baseURL: `${Config.get('MULE_HOST')}${Config.get('AppConfig').MULE_API_URL}/${
      Config.get('AppConfig').MULE_API_VERSION
    }`,
    headers: {
      'Content-Type': 'application/json',
      client_id: Config.get('MULE_USER'),
      client_secret: Config.get('MULE_PASS'),
    },
    timeout: EnvironmentUtils.isMockData() ? 2000 : Number(Config.get('AppConfig').HTTP_TIMEOUT),
    withCredentials: true,
  });

export const BaseMuleApi = {
  http,
};
