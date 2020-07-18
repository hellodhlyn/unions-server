import faker from 'faker';
import { Factory } from 'rosie';
import { v4 as uuidv4 } from 'uuid';

import User from '../src/models/user';
import Union from '../src/models/union';
import AccessToken from '../src/models/access_token';

export default function defineFactories(): void {
  Factory.define<Union>('Union')
    .sequence('id')
    .attr('name', () => faker.company.companyName())
    .attr('slug', () => faker.random.word())
    .attr('description', () => faker.lorem.lines(1))
    .attr('users', (): User[] => [])
    .attr('createdAt', () => new Date())
    .attr('updatedAt', () => new Date());

  Factory.define<User>('User')
    .sequence('id')
    .attr('uuid', () => uuidv4())
    .attr('name', () => faker.name.findName())
    .attr('description', () => faker.lorem.lines(1))
    .attr('createdAt', () => new Date())
    .attr('updatedAt', () => new Date());

  Factory.define<AccessToken>('AccessToken')
    .sequence('id')
    .attr('accessKey', () => faker.random.alphaNumeric(40))
    .attr('refreshKey', () => faker.random.alphaNumeric(40))
    .attr('accessExpireAt', () => new Date(Date.now() + 1 * 24 * 3600 * 1000))
    .attr('refreshExpireAt', () => new Date(Date.now() + 7 * 24 * 3600 * 1000))
    .attr('user', () => Factory.build<User>('User'))
    .attr('createdAt', () => new Date())
    .attr('updatedAt', () => new Date());
}
