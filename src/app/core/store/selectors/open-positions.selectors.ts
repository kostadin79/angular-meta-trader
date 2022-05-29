import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectIds, selectEntities, selectAll, selectTotal } from 'app-core/store/reducers/open-position.reducer';
import { OpenPositionsState} from 'app-core/models/open-position.model';

export const openPositionsEntities = createFeatureSelector<OpenPositionsState>('OpenPosition');




export const selectOpenPositionsIds = createSelector(
  openPositionsEntities,
  selectIds
);
export const selectOpenPositionsEntities = createSelector(
  openPositionsEntities,
  selectEntities
);
export const selectAllOpenPositions = createSelector( openPositionsEntities, selectAll);
export const selectTotalOpenPositions = createSelector( openPositionsEntities, selectTotal);

