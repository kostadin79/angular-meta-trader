import { ActionReducerMap, MetaReducer, Store, StoreModule } from '@ngrx/store';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import * as Configuration from './reducers/configuration.reducer';
import * as Rate from './reducers/rate.reducer';
import * as OpenPosition from './reducers/open-position.reducer';
import * as Charts from './reducers/chart.reducer';
import { AppState } from 'app-core/models/general-state';
import { Actions, EffectsModule } from '@ngrx/effects';
import { ConfigurationEffects } from 'app-core/store/effects/configuration.effects';
import { RatesEffects } from 'app-core/store/effects/rates.effects';
import { OpenPositionsEffects } from 'app-core/store/effects/open-positions.effects';
import { ChartsEffects } from 'app-core/store/effects/charts.effects';
import { TransferState } from '@angular/core';
import { setStateOnBrowser, stateTransferFromServerToBrowser} from '../utils/state-transfer.helper';
import { storeDevtoolsModule } from '../../replacements/store-devtools.module';

export const reducers: ActionReducerMap<AppState> = {
  configuration: Configuration.reducer,
  rates: Rate.reducer,
  OpenPosition: OpenPosition.reducer,
  Charts: Charts.reducer,
};

const metaReducers: MetaReducer<AppState>[] = [setStateOnBrowser];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      ConfigurationEffects,
      RatesEffects,
      OpenPositionsEffects,
      ChartsEffects,
    ]),
    storeDevtoolsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: stateTransferFromServerToBrowser,
      deps: [TransferState, Store, Actions],
      multi: true,
    },
  ],
})
export class CoreStoreModule {}
