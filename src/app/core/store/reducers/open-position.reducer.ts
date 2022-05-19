import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OpenPosition, OpenPositionsState} from 'app-core/models/open-position.model';
import * as OpenPositionActions from 'app-core/store/actions/open-position.actions';

export const openPositionsFeatureKey = 'openPositions';

// export type OpenPositionsState = EntityState<OpenPosition>;

export const adapter: EntityAdapter<OpenPosition> = createEntityAdapter<OpenPosition>();

export const initialState: OpenPositionsState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(OpenPositionActions.addOpenPosition,
    (state, action) => adapter.addOne(action.openPosition, state)
  ),
  on(OpenPositionActions.upsertOpenPosition,
    (state, action) => adapter.upsertOne(action.openPosition, state)
  ),
  on(OpenPositionActions.addOpenPositions,
    (state, action) => adapter.addMany(action.openPositions, state)
  ),
  on(OpenPositionActions.upsertOpenPositions,
    (state, action) => adapter.upsertMany(action.openPositions, state)
  ),
  on(OpenPositionActions.updateOpenPosition,
    (state, action) => adapter.updateOne(action.openPosition, state)
  ),
  on(OpenPositionActions.updateOpenPositions,
    (state, action) => adapter.updateMany(action.openPositions, state)
  ),
  on(OpenPositionActions.deleteOpenPosition,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(OpenPositionActions.deleteOpenPositions,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(OpenPositionActions.loadOpenPositions,
    (state, action) => adapter.setAll(action.openPositions, state)
  ),
  on(OpenPositionActions.clearOpenPositions,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
