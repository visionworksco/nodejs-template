import { AccessTokenPayload } from './AccessTokenPayload';
import { BaseTokenParser } from './BaseTokenParser';

export class AccessTokenParser extends BaseTokenParser {
  constructor(token: string) {
    super(token);
  }

  public toPayload(): AccessTokenPayload | undefined {
    const valueParsed = this.parse();
    return valueParsed ? (valueParsed as any as AccessTokenPayload) : undefined;
  }
}
