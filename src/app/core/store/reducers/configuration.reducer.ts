import { createReducer, on } from '@ngrx/store';
import { ConfigurationState } from 'app-core/models/configuration';
import { loadConnectWebsocketsSuccess } from 'app-core/store/actions/configuration.actions';
import { startRatesStream, stopRatesStream } from "app-core/store/actions/rate.actions";
import {startOpenPositionsStream, stopOpenPositionsStream} from "app-core/store/actions/open-position.actions";

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
  openPositionStreamStarted: false,
  ratesStreamStarted: false
};

export const reducer = createReducer(
  initialState,
  on(loadConnectWebsocketsSuccess, (state) =>
      ({
      ...state,
      websocketConnected: true,
    })
  ),
  on(startRatesStream, state =>
    ({
      ...state,
      ratesStreamStarted: true
    })
  ),
  on(stopRatesStream, state =>
    ({
      ...state,
      ratesStreamStarted: false
    })
  ),
  on(startOpenPositionsStream, state =>
    ({
      ...state,
      openPositionStreamStarted: true
    })
  ),
  on(stopOpenPositionsStream, state =>
    ({
      ...state,
      openPositionStreamStarted: false
    })
  )
);
