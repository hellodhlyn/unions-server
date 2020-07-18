import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

import User from '../models/user';

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('name') name: string): Promise<User> {
    return getRepository(User).findOne({ name });
  }
}
