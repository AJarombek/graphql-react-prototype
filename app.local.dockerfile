# Application server Dockerfile for the graphql-react-prototype when run locally.
# Author: Andrew Jarombek
# Date: 7/3/2021

FROM graphql-react-prototype-base:latest AS base

ARG GITHUB_ACCESS_TOKEN

WORKDIR app
RUN touch /app/.env \
    && echo "GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN" >> /app/.env

RUN yarn build

FROM nginx AS host

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for running the graphql-react-prototype application on an ngnix server."

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=base /app/dist /usr/share/nginx/html
