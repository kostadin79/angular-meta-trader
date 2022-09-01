/// <reference lib="webworker" />

import { SocketRequest } from 'app-core/models/socket-message';

const socket = new WebSocket('ws://127.0.0.1:8888');

addEventListener( 'message', ({ data }: MessageEvent<SocketRequest>) => {socket.send(JSON.stringify(data));});

socket.onopen = () => {
  postMessage({ event: 'SOCKET_IS_STARTED' });
};

socket.onmessage = (message: MessageEvent<string>) => {
  postMessage(JSON.parse(message.data));
};
