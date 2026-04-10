# Build stage
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli && npm install && ng build fuse --configuration production

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist/fuse /usr/share/nginx/html
EXPOSE 80
