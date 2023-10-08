# graphql-react-prototype

![Maintained Label](https://img.shields.io/badge/Maintained-Yes-brightgreen?style=for-the-badge)

### Overview

This front-end application demonstrates how to integrate a GraphQL API with a React.js application.  
This prototype invokes GraphQL with an HTTP client library, not using a GraphQL client library like 
Apollo.

### Commands

**Lint the JavaScript Code**

```bash 
npm run lint
```

**Start the Server Locally**

```bash
nvm use v18.16.1
export GITHUB_ACCESS_TOKEN=xxx

touch .env
echo "GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN" >> .env

npm run start
```

**Build Dockerfiles Locally**

```bash
docker image build -t graphql-react-prototype-base:latest -f base.dockerfile .

docker image build \
    -t graphql-react-prototype-app:latest \
    --build-arg GITHUB_ACCESS_TOKEN='xxxx' \
    -f app.local.dockerfile .
```

**Start Docker Containers**

```bash 
# From ECR
docker image pull 739088120071.dkr.ecr.us-east-1.amazonaws.com/graphql-react-prototype-base
docker container run -d --name graphql-react-prototype-base \
    739088120071.dkr.ecr.us-east-1.amazonaws.com/graphql-react-prototype-base:latest

# Base Image From local build
docker container run -d --name graphql-react-prototype-base graphql-react-prototype-base:latest

# App Image From local build
docker container run -d -p 8081:80 --name graphql-react-prototype-app graphql-react-prototype-app:latest

# Execute commands on the running container
docker container exec -it graphql-react-prototype-base bash

# Stop and Remove containers
docker container stop graphql-react-prototype-base
docker container rm graphql-react-prototype-base

docker container stop graphql-react-prototype-app
docker container rm graphql-react-prototype-app
```

### Files

| Filename               | Description                                                            |
|------------------------|------------------------------------------------------------------------|
| `graphql`              | GraphQL queries used throughout the application.                       |
| `infra`                | AWS Infrastructure written in Terraform.                               |
| `src`                  | React application code.                                                |
| `test`                 | Jest/Enzyme unit/integration tests for the application.                |
| `.babelrc`             | Configuration for the Babel transpiler.                                |
| `.eslintrc.js`         | Configuration for ESLint using the AirBnB style guide.                 |
| `.prettierignore`      | File patterns for the Prettier code formatter to ignore.               |
| `.prettierrc`          | Configuration for Prettier.                                            |
| `app.dockerfile`       | Dockerfile for hosting the application server.                         |
| `app.local.dockerfile` | Dockerfile for hosting the application server locally.                 |
| `base.dockerfile`      | Dockerfile for the base application and testing environment.           |
| `jest.config.js`       | Jest unit testing configuration for the React app.                     |
| `nginx.conf`           | Nginx web server configuration.                                        |
| `package.json`         | Entry point for the npm application.  Contains dependency definitions. |
| `package-lock.json`    | Where npm stores the versions of each dependency.                      |
| `webpack.config.js`    | Webpack bundler configuration file.                                    |

### Version History

**[V.1.0.1](https://github.com/AJarombek/graphql-react-prototype/tree/v1.0.1) - GitHub Actions**

> Release Date: October 7th, 2023

* Add GitHub Actions for Linting and Formatting

**[V.1.0.0](https://github.com/AJarombek/graphql-react-prototype/tree/v1.0.0) - Initial Release**

> Release Date: July 30th, 2021

### Resources

1) [Using Environment Variables in React](https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5)
2) [Axios Docs](https://github.com/axios/axios)
3) [regeneratorRuntime for `async`/`await` Transpiling](https://github.com/babel/babel/issues/9849#issuecomment-612595221)
