FROM node:alpine
WORKDIR '/MoviesAPI-2022'
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]