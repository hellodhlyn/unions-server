import { UnionsError } from './index';

class UnauthorizedError extends UnionsError {
  statusCode(): number {
    return 401;
  }
}

export class Unauthorized extends UnauthorizedError {}
export class NoSuchMember extends UnauthorizedError {}
