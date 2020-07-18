import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';

import UserResolver from './graphql/user';
import ormconfig from './ormconfig';

async function startServer() {
  await createConnection(ormconfig);

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({ schema });
  server.listen().then(({ url }) => {
    console.log(`Server is listening ${url}`);
  });
}

(async () => { await startServer(); })();
