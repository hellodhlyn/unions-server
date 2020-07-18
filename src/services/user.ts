import { randomBytes } from 'crypto';
import { getRepository } from 'typeorm';

import { NoSuchMember, Unauthorized } from '../errors/unauthorized';
import LuppiterClient from '../lib/luppiter';
import AccessToken from '../models/access_token';
import User from '../models/user';

export default class UserService {
  private readonly accessExpireDate = 1;

  private readonly refreshExpireDate = 14;

  private readonly DAYS = 24 * 60 * 60 * 1000;

  private luppiterClient = new LuppiterClient();

  async signIn(activationKey: string): Promise<AccessToken> {
    const userUuid = await this.activateAccount(activationKey);
    const user = await getRepository(User).findOne({ uuid: userUuid });
    if (!user) {
      throw new NoSuchMember();
    }
    return this.createAccessToken(user);
  }

  async signUp(activationKey: string, username: string): Promise<AccessToken> {
    const userUuid = await this.activateAccount(activationKey);
    const user = await getRepository(User).save({ uuid: userUuid, name: username });
    return this.createAccessToken(user);
  }

  private async activateAccount(activationKey: string): Promise<string> {
    const { accessKey, secretKey } = await this.luppiterClient.activate(activationKey) || {};
    if (!accessKey) {
      throw new Unauthorized();
    }

    const { uuid } = await this.luppiterClient.getMe(accessKey, secretKey);
    if (!uuid) {
      throw new Unauthorized();
    }
    return uuid;
  }

  private async createAccessToken(user: User): Promise<AccessToken> {
    const token = new AccessToken();
    token.accessKey = randomBytes(20).toString('hex');
    token.refreshKey = randomBytes(20).toString('hex');
    token.accessExpireAt = new Date(Date.now() + this.accessExpireDate * this.DAYS);
    token.refreshExpireAt = new Date(Date.now() + this.refreshExpireDate * this.DAYS);
    token.user = user;
    return getRepository(AccessToken).save(token);
  }
}
