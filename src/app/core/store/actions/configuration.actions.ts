import { createAction, props } from '@ngrx/store';

export const loadConnectWebsockets = createAction(
  '[ConnectWebsocket] Load ConnectWebsockets'
);

export const loadConnectWebsocketsSuccess = createAction(
  '[ConnectWebsocket] Load ConnectWebsockets Success'
);

export const loadConnectWebsocketsFailure = createAction(
  '[ConnectWebsocket] Load ConnectWebsockets Failure',
  props<{ error: any }>()
);
