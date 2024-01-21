# Jeteo

## Apps and Packages

- `api`: a Nest.js API
- `web`: a Next.js web application
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Develop

To develop jeteo, run the following commands:

Copy the .env.template file to .env and fill in the values:
```
cp .env.template .env
```

To start the database:
```
docker compose -f .docker/docker-compose.local.yaml up jeteo-db -d
```

To install all dependencies:
```
npm install
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

### Test E2E
To open the Cypress application for debugging tests, go to `cd /apps/web` and run the next command:
```
npm run cypress
```
To run tests in the background (without a visible interface), use the main `package.json` command:
```
npm run test
```

## Production

### Backups
https://offen.github.io/docker-volume-backup/how-tos/
