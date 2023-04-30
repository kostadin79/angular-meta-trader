/// <reference lib="webworker" />

import { SocketRequest } from 'app-core/models/socket-message';

const socketAddress = `ws://${WS_SOCKET}`;

const socket = new WebSocket(socketAddress);

addEventListener('message', ({ data }: MessageEvent<SocketRequest>) => {
  socket.send(JSON.stringify(data));
});

socket.onopen = () => {
  postMessage({ event: 'SOCKET_IS_STARTED' });
};

socket.onmessage = (message: MessageEvent<string>) => {
  postMessage(JSON.parse(message.data));
};
