import { expect } from 'chai';
import faker from 'faker';
import { Factory } from 'rosie';
import { getRepository } from 'typeorm';

import UserResolver from '../../src/graphql/user';
import User from '../../src/models/user';

describe('UserResolver', async () => {
  const resolver = new UserResolver();
  let user: User;

  beforeEach(async () => {
    user = await getRepository(User).save(Factory.build<User>('User'));
  });

  describe('user', () => {
    it('success', async () => {
      expect(await resolver.user(user.name)).to.be.eql(user);
      expect(await resolver.user(faker.name.findName())).to.be.undefined;
    });
  });
});
