# Steps to creating a full-stack web-app

You can use TypeScript and you would want a Object-relational mapping tool like typeORM or MikroORM. 

## Database setup PSQL, MikroORM
- Set up the backend store, where you're going to be storing data. 
- CRUD operations with mikroORM
- create entities 
- add entities to our config
- In CLI, run migrations
The migrator in the code in index.ts will run the up() function in the migration with `await orm.getMigrator().up();`

## Setting an express server with apollo-server-express/graphql/type-graphql
- create an express app in `index.ts`
...

## Basically the steps this tutorial takes:
- set up a post entity
- set up a user entity
- set up GraphQL server side resolvers for post and user
- run migrations for your postgreSQL dB where mikroORM helps convert to SQL
- now to make sure user continues to stay logged in with sessions
- use express Session and redis for in-memory database. 
    - you could use postgres as well, but this tutorial uses redis
