# Angular Dashboard to Meta Trader 4 terminal

## Before to start

Before to start the project, the Meta Trader 4 terminal must be started with MetaTrader4Bridge2.mq4 activated.
More about that [MQL 4 Folder for ZeroMQ for Meta Trader 4](https://github.com/kostadin79/zeromq-meta-trader)

NestJS socket gateway must be started. More about that [Meta Trader 4 with NestJS Socket Gateway](https://github.com/kostadin79/nest-meta-trader)

## Example usage

The socket gateway port can be changed - environment.ts
```ts
export const environment = {
  production: false,
};
export const WS_ENDPOINT = 'ws://localhost:4200/socket-ws';
```

![Angular Dashboard to Meta Trader 4 terminal](https://user-images.githubusercontent.com/39057409/166572619-b0ed0a00-1978-4d4e-b8d3-5efb62b66710.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

