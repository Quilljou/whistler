import axios, { AxiosRequestConfig } from 'axios';
import { setting } from '../lib/settings';

axios.defaults.timeout = 5000;

export async function request<T>(options: AxiosRequestConfig) {
  const path = `http://${await setting.getIp()}:${await setting.getProxyPort()}`;
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
