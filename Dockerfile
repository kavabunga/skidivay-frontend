FROM node:20-alpine3.17 as build

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app
RUN npm run build

EXPOSE 8080

