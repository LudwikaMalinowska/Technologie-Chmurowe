FROM node:latest AS build
WORKDIR /app
COPY ./package.json .
RUN npm i
COPY src src
COPY public public
RUN npm run build
