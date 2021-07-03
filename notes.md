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
- 