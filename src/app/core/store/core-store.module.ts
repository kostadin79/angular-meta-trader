import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import * as Configuration from './reducers/configuration.reducer';
import * as Rate from './reducers/rate.reducer';
import * as OpenPosition from './reducers/open-position.reducer';
import { AppState } from 'app-core/models/general-state';
import { EffectsModule } from '@ngrx/effects';
import { ConfigurationEffects } from 'app-core/store/effects/configuration.effects';
import { RatesEffects } from 'app-core/store/effects/rates.effects';
import { OpenPositionsEffects } from 'app-core/store/effects/open-positions.effects';

export const reducers: ActionReducerMap<AppState> = {
  configuration: Configuration.reducer,
  rates: Rate.reducer,
  OpenPosition: OpenPosition.reducer,
};

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      ConfigurationEffects,
      RatesEffects,
      OpenPositionsEffects,
    ]),
  ],
})
export class CoreStoreModule {}
