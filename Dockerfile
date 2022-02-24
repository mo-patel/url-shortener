FROM node:latest as base

WORKDIR /url-shortener/app

COPY package*.json ./

RUN npm i

COPY . .