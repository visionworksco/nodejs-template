import axios, { AxiosInstance } from 'axios';
import { Config } from '../config/Config';
import { EnvironmentUtils } from '../environment/EnvironmentUtils';

const http = (): AxiosInstance =>
  axios.create({
    baseURL: `${Config.get('BASE_URL')}`,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: EnvironmentUtils.isMockData() ? 2500 : Number(Config.get('HTTP_TIMEOUT')),
    withCredentials: true,
  });

export const BaseApi = {
  http,
};
