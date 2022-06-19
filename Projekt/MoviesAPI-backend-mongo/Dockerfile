FROM node:alpine
WORKDIR '/MoviesAPI-backend-mongo'
COPY ./package.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start"]