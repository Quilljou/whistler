import axios, { AxiosRequestConfig } from 'axios';
import { setting } from '../lib/settings';

export async function request<T>(options: AxiosRequestConfig) {
  const path = `http://${await setting.getIp()}:${await setting.getPort()}`;
  return axios
    .request<T>({
      ...options,
      baseURL: path,
    })
    .then(value => {
      if (value.status < 300 && value.status >= 200) {
        return value;
      } else {
        throw new Error('network');
      }
    });
}
