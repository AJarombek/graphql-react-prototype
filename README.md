# graphql-react-prototype

### Overview

This front-end application demonstrates how to integrate a GraphQL API with a React.js application.  
This prototype invokes GraphQL with an HTTP client library, not using a GraphQL client library like 
Apollo.

### Commands

**Build Dockerfiles Locally**

```bash
docker image build -t graphql-react-prototype-base:latest -f base.dockerfile .
docker image build -t graphql-react-prototype-app:latest -f app.dockerfile .
```

**Start Docker Containers**

```bash 
# From ECR
docker image pull 739088120071.dkr.ecr.us-east-1.amazonaws.com/graphql-react-prototype-base
docker container run -d --name graphql-react-prototype-base \
    739088120071.dkr.ecr.us-east-1.amazonaws.com/graphql-react-prototype-base:latest

# From local build
docker container run -d --name graphql-react-prototype-base graphql-react-prototype-base:latest

# Execute commands on the running container
docker container exec -it graphql-react-prototype-base bash

# Stop and Remove containers
docker container stop graphql-react-prototype-base
docker container rm graphql-react-prototype-base
```

### Files

| Filename                 | Description                                                                |
|--------------------------|----------------------------------------------------------------------------|
| `graphql`                | GraphQL queries used throughout the application.                           |
| `infra`                  | AWS Infrastructure written in Terraform.                                   |
| `src`                    | React application code.                                                    |
| `test`                   | Jest/Enzyme unit/integration tests for the application.                    |
| `.babelrc`               | Configuration for the Babel transpiler.                                    |
| `.eslintrc.js`           | Configuration for ESLint using the AirBnB style guide.                     |
| `app.dockerfile`         | Dockerfile for hosting the application server.                             |
| `base.dockerfile`        | Dockerfile for the base application and testing environment.               |
| `jest.config.js`         | Jest unit testing configuration for the React app.                         |
| `package.json`           | Entry point for the npm application.  Contains dependency definitions.     |
| `package-lock.json`      | Where npm stores the versions of each dependency.                          |
| `webpack.config.js`      | Webpack bundler configuration file.                                        |

### Resources

1) [Using Environment Variables in React](https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5)
2) [Axios Docs](https://github.com/axios/axios)
3) [regeneratorRuntime for `async`/`await` Transpiling](https://github.com/babel/babel/issues/9849#issuecomment-612595221)
