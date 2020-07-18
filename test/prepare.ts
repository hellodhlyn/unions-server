import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mochaPrepare from 'mocha-prepare';
import { createConnection, getRepository } from 'typeorm';

import buildFactories from './factories';
import ormconfig from '../src/ormconfig';
import AccessToken from '../src/models/access_token';
import User from '../src/models/user';
import Union from '../src/models/union';

mochaPrepare(
  async (done) => {
    await createConnection(ormconfig);
    buildFactories();

    chai.use(chaiAsPromised);

    process.env.JWT_SECRET_KEY = 'dummy';
    process.env.JWT_TOKEN_ISSUER = 'dummy';
    process.env.LUPPITER_APP_SECRET_KEY = 'dummy';

    done();
  },
  async (done) => {
    await Promise.all(
      [AccessToken, User, Union].map((model) => getRepository(model).clear()),
    );
    done();
  },
);
