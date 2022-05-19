import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as Configuration from './configuration.reducer';
import * as Rate from './rate.reducer';
import * as OpenPosition from './open-position.reducer';
import { AppState } from 'app-core/models/general-state';
// import { ConfigurationState } from 'app-core/models/configuration';
// import { RateState } from 'app-core/models/rate.model';
// import { OpenPositionsState} from "app-core/models/open-position.model";

// export interface State {
//   configuration: ConfigurationState;
//   rates: RateState;
//   OpenPosition: OpenPositionsState;
// }

export const reducers: ActionReducerMap<AppState> = {
  configuration: Configuration.reducer,
  rates: Rate.reducer,
  OpenPosition: OpenPosition.reducer,
};

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
