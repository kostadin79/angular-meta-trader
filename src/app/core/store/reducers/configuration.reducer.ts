import { createReducer, on } from '@ngrx/store';
import { ConfigurationState } from 'app-core/models/configuration';
import { loadConnectWebsocketsSuccess } from 'app-core/store/actions/configuration.actions';

export const initialState: ConfigurationState = {
  realTimeRatesList: [
    'EURUSD',
    'USDJPY',
    'EURGBP',
    'GBPUSD',
    'EURJPY',
    'GBPJPY',
    'USDCAD',
    'EURCHF',
    'GBPCHF',
    'USDCHF',
    'CADCHF',
    'CHFJPY',
    'CADJPY',
    'GBPCAD',
    'EURCAD',
    'AUDUSD',
    'NZDUSD',
  ],
  websocketConnected: false,
};

export const reducer = createReducer(
  initialState,
  on(loadConnectWebsocketsSuccess, (state) => ({
    ...state,
    websocketConnected: true,
  }))
);
