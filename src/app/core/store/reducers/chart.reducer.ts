import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Chart, ChartsState } from '../../models/chart.model';
import * as ChartActions from '../actions/chart.actions';
import {getChartSuccess} from "../actions/chart.actions";

export const chartsFeatureKey = 'charts';

// export type State = EntityState<Chart>;

export const adapter: EntityAdapter<Chart> = createEntityAdapter<Chart>();

export const initialState: ChartsState = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(ChartActions.addChart, (state, action) =>
    adapter.addOne(action.chart, state)
  ),
  on(ChartActions.upsertChart, getChartSuccess, (state, action) =>
    adapter.upsertOne(action.chart, state)
  ),
  on(ChartActions.addCharts, (state, action) =>
    adapter.addMany(action.charts, state)
  ),
  on(ChartActions.upsertCharts, (state, action) =>
    adapter.upsertMany(action.charts, state)
  ),
  on(ChartActions.updateChart, (state, action) =>
    adapter.updateOne(action.chart, state)
  ),
  on(ChartActions.updateCharts, (state, action) =>
    adapter.updateMany(action.charts, state)
  ),
  on(ChartActions.deleteChart, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ChartActions.deleteCharts, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(ChartActions.loadCharts, (state, action) =>
    adapter.setAll(action.charts, state)
  ),
  on(ChartActions.clearCharts, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
