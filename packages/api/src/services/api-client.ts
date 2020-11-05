import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { injectable } from 'inversify';

@injectable()
export class ApiClient {
  private client: AxiosInstance;

  public constructor() {
    this.client = axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.client.get(url, config);
  }
  public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.client.delete(url, config);
  }
  public head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.client.head(url, config);
  }
  public options<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.client.options(url, config);
  }
  public post<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.client.post(url, data, config);
  }
  public put<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.client.put(url, data, config);
  }
  public patch<T, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.client.patch(url, data, config);
  }
}
