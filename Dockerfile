# Build for linux/amd64
FROM --platform=linux/amd64 node:20-alpine3.17 as build

WORKDIR /app

COPY package.json package-lock.json /app/

# Clean install to match dev environment
RUN npm ci

COPY . /app
RUN npm run build
