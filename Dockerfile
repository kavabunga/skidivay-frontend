FROM --platform=amd64 node:20-alpine3.17 as build-amd64

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app
RUN npm run build

EXPOSE 8080

