import { injectable } from 'inversify';
import CookiesImpl, { Cookies, CookiesOption } from 'cookies-ts';

@injectable()
export class CookiesService implements Cookies {
  private cookies: Cookies;

  constructor() {
    this.cookies = new CookiesImpl();
    this.cookies.config({
      expires: '7d',
      secure: true,
    });
  }

  config(option: CookiesOption): void {
    this.cookies.config(option);
  }

  get(key: string): string | object | null {
    return this.cookies.get(key);
  }

  isKey(key: string): boolean {
    return this.cookies.isKey(key);
  }

  keys(): string[] {
    return this.cookies.keys();
  }

  remove(key: string, option?: CookiesOption | undefined): Cookies | boolean {
    return this.cookies.remove(key, option);
  }

  set(key: string, value: any, option?: CookiesOption | undefined): Cookies {
    return this.cookies.set(key, value, option);
  }
}
