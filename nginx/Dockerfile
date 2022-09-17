FROM node:14.20.0-slim AS build-stage
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /app/dist/angular-meta-trader/browser/ .
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
