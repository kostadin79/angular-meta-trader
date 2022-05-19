import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Rate, RateState } from 'app-core/models/rate.model';
import * as RateActions from '../actions/rate.actions';

export const ratesFeatureKey = 'rates';

// export type RateState = EntityState<Rate>;

export const adapter: EntityAdapter<Rate> = createEntityAdapter<Rate>();

export const initialState: RateState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(RateActions.addRate, (state, action) =>
    adapter.addOne(action.rate, state)
  ),
  on(RateActions.upsertRate, (state, action) =>
    adapter.upsertOne(action.rate, state)
  ),
  on(RateActions.addRates, (state, action) =>
    adapter.addMany(action.rates, state)
  ),
  on(RateActions.upsertRates, (state, action) =>
    adapter.upsertMany(action.rates, state)
  ),
  on(RateActions.updateRate, (state, action) =>
    adapter.updateOne(action.rate, state)
  ),
  on(RateActions.updateRates, (state, action) =>
    adapter.updateMany(action.rates, state)
  ),
  on(RateActions.deleteRate, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(RateActions.deleteRates, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(RateActions.loadRates, (state, action) =>
    adapter.setAll(action.rates, state)
  ),
  on(RateActions.clearRates, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
