FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN pwd
RUN ls
CMD ["npm", "run", "start"]