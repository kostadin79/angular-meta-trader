import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  OpenPosition,
  OpenPositionsState,
} from 'app-core/models/open-position.model';
import {
  addOpenPosition,
  upsertOpenPosition,
  addOpenPositions,
  upsertOpenPositions,
  updateOpenPosition,
  updateOpenPositions,
  deleteOpenPosition,
  deleteOpenPositions,
  loadOpenPositions,
  clearOpenPositions, initialOpenPositionsLoadSuccess, updateOpenPositionsFromStreamSuccess,
} from 'app-core/store/actions/open-position.actions';
import { initialRatesLoadSuccess } from 'app-core/store/actions/rate.actions';

export const openPositionsFeatureKey = 'openPositions';

// export type OpenPositionsState = EntityState<OpenPosition>;

export const adapter: EntityAdapter<OpenPosition> =
  createEntityAdapter<OpenPosition>();

export const initialState: OpenPositionsState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(addOpenPosition, (state, action) =>
    adapter.addOne(action.openPosition, state)
  ),
  on(upsertOpenPosition, (state, action) =>
    adapter.upsertOne(action.openPosition, state)
  ),
  on(addOpenPositions, initialOpenPositionsLoadSuccess, (state, action) =>
    adapter.addMany(action.openPositions, state)
  ),
  on( upsertOpenPositions,updateOpenPositionsFromStreamSuccess, (state, action) =>
    adapter.upsertMany(action.openPositions, state)
  ),
  on(updateOpenPosition, (state, action) =>
    adapter.updateOne(action.openPosition, state)
  ),
  on(updateOpenPositions, (state, action) =>
    adapter.updateMany(action.openPositions, state)
  ),
  on(deleteOpenPosition, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(deleteOpenPositions, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(loadOpenPositions, (state, action) =>
    adapter.setAll(action.openPositions, state)
  ),
  on(clearOpenPositions, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
