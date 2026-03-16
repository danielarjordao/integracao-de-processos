# STAGE 1: BUILD
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci 

COPY . .
RUN npm run build

# STAGE 2: SERVE
FROM nginx:alpine

COPY --from=build /app/dist/<nome_proj>/browser /usr/share/nginx/html
EXPOSE 80