## User Listing

> You can find `.env.example` for setting up required environment variables

## Development setup

First clone this repo and cd into this directory and execute following commands
to start development server

```
pnpm install
pnpm start:dev
```

Server will start listening on port 3000 and you can browser API documentation at http://localhost:3000/api/

### Seeding database

A seeder is provided to populate local database for development, you can run using

```
pnpm seed:run
```

## Contributing

Checkout new branch from your local develop branch, add meaningful branch name with prefix like
`fix/` when fixing a bug or `feat/` when adding a new feature.

```text
git checkout -b fix/meaningful-name
```

After making changes to your local git repository make sure to run linter
scripts

```text
yarn lint:style
yarn lint:script
```

If you have any linting error Fix them now by running

```text
yarn lint:fix
```

and then finally format your code using `prettier`

```text
yarn prettier
```

Now commit your changes and provide title and summary of changes then execute

```text
git push
```

Now you can submit a PR.
