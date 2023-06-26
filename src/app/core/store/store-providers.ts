import { ActionReducerMap, MetaReducer, Store, StoreModule } from '@ngrx/store';
import { AppState } from 'app-core/models/general-state';
import * as Configuration from './reducers/configuration.reducer';
import * as Rate from './reducers/rate.reducer';
import * as OpenPosition from './reducers/open-position.reducer';
import * as Charts from './reducers/chart.reducer';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  setStateOnBrowser,
  stateTransferFromServerToBrowser,
} from 'app-core/utils/state-transfer.helper';
import {
  APP_INITIALIZER,
  EnvironmentProviders,
  importProvidersFrom,
  Provider,
  TransferState,
} from '@angular/core';
import { Actions, EffectsModule } from '@ngrx/effects';
import { ConfigurationEffects } from 'app-core/store/effects/configuration.effects';
import { RatesEffects } from 'app-core/store/effects/rates.effects';
import { OpenPositionsEffects } from 'app-core/store/effects/open-positions.effects';
import { ChartsEffects } from 'app-core/store/effects/charts.effects';
import { CustomSerializer } from 'app-core/utils/custom-route.serializer';
import { storeDevtoolsModule } from '../../replacements/store-devtools.module';

export const reducers: ActionReducerMap<AppState> = {
  configuration: Configuration.reducer,
  rates: Rate.reducer,
  OpenPosition: OpenPosition.reducer,
  Charts: Charts.reducer,
  router: routerReducer,
};

const metaReducers: MetaReducer<AppState>[] = [setStateOnBrowser];

export const providersForStore: (Provider | EnvironmentProviders)[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: stateTransferFromServerToBrowser,
    deps: [TransferState, Store, Actions],
    multi: true,
  },
  importProvidersFrom(
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      ConfigurationEffects,
      RatesEffects,
      OpenPositionsEffects,
      ChartsEffects,
    ]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    ...storeDevtoolsModule
  ),
];
