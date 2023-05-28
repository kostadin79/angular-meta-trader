import * as configuration from './configuration.actions';
import { anything } from 'ts-mockito';

describe('Configuration actions', () => {
  it('should return an action', () => {
    expect(configuration.loadConnectWebsockets().type).toBe(
      '[ConnectWebsocket] Load ConnectWebsockets'
    );
  });
  it('should return an action', () => {
    expect(configuration.loadConnectWebsocketsSuccess().type).toBe(
      '[ConnectWebsocket] Load ConnectWebsockets Success'
    );
  });
  it('should return an action', () => {
    expect(configuration.loadConnectWebsocketsFailure(anything()).type).toBe(
      '[ConnectWebsocket] Load ConnectWebsockets Failure'
    );
  });
});
