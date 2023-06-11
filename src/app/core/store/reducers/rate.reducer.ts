import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Rate, RateState } from 'app-core/models/rate.model';
import {
  addRate,
  upsertRate,
  addRates,
  upsertRates,
  updateRate,
  updateRates,
  deleteRate,
  deleteRates,
  loadRates,
  clearRates,
  initialRatesLoadSuccess,
  updateRatesFromStreamSuccess,
} from 'app-core/store/actions/rate.actions';

export const ratesFeatureKey = 'rates';

export const adapter: EntityAdapter<Rate> = createEntityAdapter<Rate>();

export const initialState: RateState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(addRate, (state, action) => adapter.addOne(action.rate, state)),
  on(upsertRate, (state, action) => adapter.upsertOne(action.rate, state)),
  on(addRates, (state, action) =>
    adapter.addMany(action.rates, state)
  ),
  on(upsertRates, initialRatesLoadSuccess, updateRatesFromStreamSuccess, (state, action) =>
    adapter.upsertMany(action.rates, state)
  ),
  on(updateRate, (state, action) => adapter.updateOne(action.rate, state)),
  on(updateRates, (state, action) => adapter.updateMany(action.rates, state)),
  on(deleteRate, (state, action) => adapter.removeOne(action.id, state)),
  on(deleteRates, (state, action) => adapter.removeMany(action.ids, state)),
  on(loadRates, (state, action) => adapter.setAll(action.rates, state)),
  on(clearRates, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
