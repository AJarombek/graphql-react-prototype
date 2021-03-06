# Application server Dockerfile for the graphql-react-prototype.
# Author: Andrew Jarombek
# Date: 6/28/2020

FROM 739088120071.dkr.ecr.us-east-1.amazonaws.com/graphql-react-prototype-base:latest AS base

WORKDIR app
RUN npm run build

FROM nginx AS host

LABEL maintainer="andrew@jarombek.com" \
      version="1.0.0" \
      description="Dockerfile for running the graphql-react-prototype application on an ngnix server."

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=base /app/dist /usr/share/nginx/html
