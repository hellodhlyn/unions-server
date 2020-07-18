[![Run tests and deploy](https://github.com/hellodhlyn/unions-server/workflows/Run%20tests/badge.svg)](https://github.com/hellodhlyn/unions-server/actions?query=workflow%3A%22Run+tests%22)
[![codecov](https://codecov.io/gh/hellodhlyn/unions-server/branch/master/graph/badge.svg)](https://codecov.io/gh/hellodhlyn/unions-server)

# Unions Server

Unions is an inter-blog service provide useful linkage among multiple blogs.

## Development
### Prerequisites
* NodeJS 12.X or later
* yarn

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
