import { expect } from 'chai';
import faker from 'faker';
import { Factory } from 'rosie';
import { SinonStub, stub } from 'sinon';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { NoSuchMember, Unauthorized } from '../../src/errors/unauthorized';
import LuppiterClient from '../../src/lib/luppiter';
import User from '../../src/models/user';
import AccessToken from '../../src/models/access_token';
import UserService from '../../src/services/user';

describe('UserService', () => {
  const service = new UserService();

  let activateSpy: SinonStub;
  let getMeSpy: SinonStub;

  let userUuid: string;

  describe('signIn', () => {
    context('activation key valid', () => {
      beforeEach(() => {
        userUuid = uuidv4();
        activateSpy = stub(LuppiterClient.prototype, 'activate')
          .resolves({ accessKey: faker.random.alphaNumeric(40), secretKey: faker.random.alphaNumeric(40) });
        getMeSpy = stub(LuppiterClient.prototype, 'getMe').resolves({ uuid: userUuid });
      });

      afterEach(() => {
        [activateSpy, getMeSpy].forEach((spy) => spy.restore());
      });

      it('success if user exists', async () => {
        await getRepository(User).save(Factory.build<User>('User', { uuid: userUuid }));
        const res = await service.signIn(faker.random.alphaNumeric(40));
        expect(await getRepository(AccessToken).findOne({ accessKey: res.accessKey })).to.be.exist;
      });

      it('throw NoSuchMember if user not exists', () => {
        expect(service.signIn(faker.random.alphaNumeric(40))).to.be.rejectedWith(NoSuchMember);
      });
    });

    context('activation key invalid', () => {
      beforeEach(() => { activateSpy = stub(LuppiterClient.prototype, 'activate').resolves(null); });
      afterEach(() => activateSpy.restore());

      it('throw Unauthorized', () => {
        expect(service.signIn(faker.random.alphaNumeric(40))).to.be.rejectedWith(Unauthorized);
      });
    });
  });

  describe('signUp', () => {
    context('activation key valid', () => {
      beforeEach(() => {
        userUuid = uuidv4();
        activateSpy = stub(LuppiterClient.prototype, 'activate')
          .resolves({ accessKey: faker.random.alphaNumeric(40), secretKey: faker.random.alphaNumeric(40) });
        getMeSpy = stub(LuppiterClient.prototype, 'getMe').resolves({ uuid: userUuid });
      });

      afterEach(() => {
        [activateSpy, getMeSpy].forEach((spy) => spy.restore());
      });

      it('create a user', async () => {
        const username = faker.name.findName();
        const res = await service.signUp(faker.random.alphaNumeric(40), username);
        expect(await getRepository(AccessToken).findOne({ accessKey: res.accessKey })).to.be.exist;
        expect(await getRepository(User).findOne({ name: username })).to.be.exist;
      });
    });
  });
});
