import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectIds, selectEntities, selectAll, selectTotal } from 'app-core/store/reducers/rate.reducer';
import { RateState } from 'app-core/models/rate.model';

export const ratesEntities = createFeatureSelector<RateState>('rates');



export const selectUserIds = createSelector(
  ratesEntities,
  (state) => state.entities
);
export const selectRatesIds = createSelector(
  ratesEntities,
  selectIds
);
export const selectRatesEntities = createSelector(
  ratesEntities,
  selectEntities
);
export const selectAllRates = createSelector(ratesEntities, selectAll);
export const selectTotalRates = createSelector(ratesEntities, selectTotal);


