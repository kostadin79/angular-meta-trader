import * as fromConnectWebsocket from './configuration.actions';

describe('loadConnectWebsockets', () => {
  it('should return an action', () => {
    expect(fromConnectWebsocket.loadConnectWebsockets().type).toBe('[ConnectWebsocket] Load ConnectWebsockets');
  });
});
