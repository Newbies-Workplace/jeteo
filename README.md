# Jeteo

### Apps and Packages

- `api`: a Nest.js API
- `web`: a Next.js web application
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Develop

To develop jeteo, run the following commands:

Copy the .env.example file to .env and fill in the values:
```
cp .env.template .env
```

To start the database:
```
docker-compose up -d
```

To generate the prisma client and types:
```
# run in ./apps/api/
npm run generate
``` 

To run the migrations on your database:
```
# run in ./apps/api/
npm run migrate
```

And finally, to start the development server:
```
npm run dev
```

App will be available at http://localhost:3000

### Build

To build all apps and packages, run the following command:

```
npm run build
```
