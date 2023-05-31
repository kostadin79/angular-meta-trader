/// <reference lib="webworker" />

import { SocketRequest } from 'app-core/models/socket-message';
import { WS_SOCKET_URL } from '../../../environments/environment';

const socket = new WebSocket(WS_SOCKET_URL);

addEventListener('message', ({ data }: MessageEvent<SocketRequest>) => {
  socket.send(JSON.stringify(data));
});

socket.onopen = () => {
  postMessage({ event: 'SOCKET_IS_STARTED' });
};

socket.onmessage = (message: MessageEvent<string>) => {
  postMessage(JSON.parse(message.data));
};
