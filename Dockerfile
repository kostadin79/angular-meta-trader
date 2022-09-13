FROM node:14.20.0-slim as build-step
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
RUN npm run build:ssr

FROM node:14.20.0-slim
WORKDIR /www
COPY ./package.json /www/
COPY --from=build-step /app/dist/angular-meta-trader/server /www/dist/angular-meta-trader/server
COPY --from=build-step /app/dist/angular-meta-trader/browser/index.html /www/dist/angular-meta-trader/browser/index.html

EXPOSE 4000
CMD [ "npm", "run", "serve:ssr" ]
