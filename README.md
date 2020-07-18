# Unions Server
## Prerequisites
* NodeJS 12.X or later
* yarn

## Development
### Setup
```sh
# Install requirements
yarn
```

### Test
```sh
# Run lint
yarn lint

# Run unit tests
yarn test
```

### Run
```sh
yarn debug
```

## Deployment
```bash
# Run using native nodejs
yarn build
yarn start

# Run using docker
docker build -t <name> .
docker run <name>
```
