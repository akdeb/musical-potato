import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import 'reflect-metadata';
// import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import redis from 'redis';
import session from 'express-session';
import connectReddis from 'connect-redis';
import { MyContext } from './types';
import cors from 'cors';

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    
    // create an express app
    const app = express();

    const RedisStore = connectReddis(session);
    const redisClient = redis.createClient();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));

    // connect to reddis store. to be used in apollo middleware
    app.use(
        session({
            name: 'qid',
            store: new RedisStore({ 
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 *24 * 365 * 10, // 10 YEARS,
                httpOnly: true,
                sameSite: 'lax', // csrf
                secure: __prod__, // cookie only works in https
            },
            saveUninitialized: false,
            secret: 'bngtdhgrstvfsfhyjkugkjf',
            resave: false,
        })
      )
    
    // create an apollo server to work with graphql
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
    });

    // create a graphQL endpoint on express
    apolloServer.applyMiddleware({ app, cors: false });

    // listen at this port
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    })

    // // this is a REST endpoint unlike graphql
    app.get('/', (_, res) => {
        res.send('hello');
    });
};

main().catch((err) => {
    console.error(err);
});
