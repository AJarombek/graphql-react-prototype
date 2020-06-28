# Application server Dockerfile for the graphql-react-prototype.
# Author: Andrew Jarombek
# Date: 6/28/2020

FROM 739088120071.dkr.ecr.us-east-1.amazonaws.com/graphql-react-prototype-base:latest AS base

WORKDIR src
RUN npm build

FROM nginx AS host

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for running the graphql-react-prototype application on an ngnix server."

COPY --from=base /src/dist /usr/share/nginx/html
