FROM node:alpine AS build
WORKDIR '/movies-api-client'
COPY ./package.json .
RUN npm i
COPY src src
COPY public public
CMD ["npm", "run", "build"]

FROM nginx:alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /movies-api-client/build /usr/share/nginx/html
