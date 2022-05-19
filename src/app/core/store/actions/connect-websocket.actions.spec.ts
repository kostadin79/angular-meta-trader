import * as fromConnectWebsocket from './connect-websocket.actions';

describe('loadConnectWebsockets', () => {
  it('should return an action', () => {
    expect(fromConnectWebsocket.loadConnectWebsockets().type).toBe('[ConnectWebsocket] Load ConnectWebsockets');
  });
});
