import { createSelector } from '@ngrx/store';
import { ConfigurationState } from 'app-core/models/configuration';
import { AppState } from 'app-core/models/general-state';

export const appConfiguration = (state: AppState): ConfigurationState =>
  state.configuration;

export const socketStatus = createSelector(
  appConfiguration,
  (state) => state.websocketConnected
);
