/**
 * server/index.js
 */

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockfunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { Schema } from './data/schema';
import { Mocks } from './data/mocks';

const GRAPHQL_PORT = 8080;
const app = express();

const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
});

addMockFunctionsToSchema({
    schema: executableSchema,
    mocks: Mocks,
    preserveResolvers: true,
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: executableSchema,
    context: {},
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));

const graphQLServer = createServer(app);



app.listen(GRAPHQL_PORT, () => console.log(`Server is now running on localhost port ${GRAPHQL_PORT}`))

