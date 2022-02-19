import atob from 'atob';
import { BaseTokenPayload } from './BaseTokenPayload';

export abstract class BaseTokenParser {
  private value?: string;

  constructor(token: string) {
    this.value = token;
  }

  public abstract toPayload(): BaseTokenPayload | undefined;

  public getValue(): string | undefined {
    return this.value;
  }

  protected parse(): string | undefined {
    if (!this.value) {
      return undefined;
    }

    const base64Url = this.value.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c: string) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }
}
