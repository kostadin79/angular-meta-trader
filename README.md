# Angular Dashboard for Meta Trader 4 terminal

It's a web dashboard for Meta Trader 4 terminal,  based on Angular.

## Demo

Project demo URL: [https://rcdsolutions.online](https://rcdsolutions.online)
"rcdsolutions.online" is a domain for demo purposes of my personal project. 
The domain is required for SSL certificate. Without SSL certificate the service worker cannot be registered.

![Angular Dashboard to Meta Trader 4 terminal](https://user-images.githubusercontent.com/39057409/166572619-b0ed0a00-1978-4d4e-b8d3-5efb62b66710.png)

## Before to start

Before running the project, the Meta Trader 4 terminal must be started with MetaTrader4Bridge2.mq4 activated.
More about that [MQL 4 Folder for ZeroMQ for Meta Trader 4](https://github.com/kostadin79/zeromq-meta-trader)

And NestJS application must be started. 
More about that [Meta Trader 4 with NestJS Socket Gateway](https://github.com/kostadin79/nest-meta-trader)

## WebSocket configuration

The default socket address configuration is located in templates/webpack.custom.ts
```ts
const defaultSocketAddress = JSON.stringify('127.0.0.1:8888');
```

### Start development 

Run `npm run start`. 
The project will be available on `http://localhost:4200`. 

### Start development with SSR

Run `npm run dev:ssr` to build the project.
The project will be available on `http://localhost:4200`.

### Build production

Run `npm run build` to build the project.

### Build and start production with SSR

Run `npm run build:ssr` to build the project with SSR.
Run `npm run serve:ssr` to start.
The project will be available on `http://localhost:4200`.

### SSR debugging

Run `npm run build:ssr` to build the project with SSR.
Run `npm run serve:ssr:inspect` to start.
SSR compilation will be available for debugging in DevTools for Node

### Docker compose

Run `docker compose up` to start the Angular SSR and NGINX.
The project will be available on `http://localhost`.

## Features

- Websocket communication
- Service Worker
- Web Worker, dedicated for Websocket
- State Transfer and SSR
- NGINX proxy

[Project 'Angular NestJS MetaTrader' description ](https://github.com/kostadin79/angular-nest-metatrader)




