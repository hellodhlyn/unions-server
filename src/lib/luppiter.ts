import jwt from 'jsonwebtoken';

export default class LuppiterClient {
  private serverHost = 'https://api.luppiter.dev';

  private appSecret = process.env.LUPPITER_APP_SECRET_KEY;

  async activate(activationKey: string): Promise<{ accessKey: string, secretKey: string }> {
    const activationToken = jwt.sign({ key: activationKey }, this.appSecret);
    const res = await fetch(`${this.serverHost}/vulcan/auth/activate`, {
      method: 'post', body: JSON.stringify({ activationToken }),
    });
    if (!res.ok) {
      return null;
    }

    const { accessKey, secretKey } = await res.json();
    return { accessKey, secretKey };
  }

  async getMe(accessKey: string, secretKey: string): Promise<{ uuid: string }> {
    const authorization = `Bearer ${jwt.sign({ accessKey }, secretKey)}`;
    const res = await fetch(`${this.serverHost}/vulcan/auth/me`, { headers: { authorization } });
    if (!res.ok) {
      return null;
    }

    const { uuid } = await res.json();
    return { uuid };
  }
}
