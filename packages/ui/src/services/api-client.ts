import { API_URL } from '@/container/types';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import store from '@/plugins/store/store';

@injectable()
export class ApiClient {
  private client: AxiosInstance;

  constructor(@inject(API_URL) private baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    this.client.interceptors.request.use(ApiClient.interceptor);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.client.get(url, config);
  }
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.client.delete(url, config);
  }
  head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.client.head(url, config);
  }
  options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.client.options(url, config);
  }
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.client.post(url, data, config);
  }
  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.client.put(url, data, config);
  }
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.client.patch(url, data, config);
  }

  private static async interceptor(config: AxiosRequestConfig) {
    const isLogged = await store.getters['auth/isUserLogged'];

    if (isLogged) {
      config.headers['X-AUTH-TOKEN'] = await store.getters['auth/getToken'];
    }

    return config;
  }
}
