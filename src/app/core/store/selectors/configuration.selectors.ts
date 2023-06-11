import { createFeatureSelector, createSelector} from '@ngrx/store';
import { ConfigurationState } from 'app-core/models/configuration';

export const appConfiguration = createFeatureSelector<ConfigurationState>('configuration')

export const socketStatus = createSelector(
  appConfiguration,
  state => state.websocketConnected
);

export const ratesStreamStatus = createSelector(
  appConfiguration,
  state => state.ratesStreamStarted
);

export const openPositionStreamStatus = createSelector(
  appConfiguration,
  state => state.openPositionStreamStarted
);
