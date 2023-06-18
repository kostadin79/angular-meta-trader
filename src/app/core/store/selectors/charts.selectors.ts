import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  getSelectedChartId,
} from 'app-core/store/reducers/chart.reducer';
import { ChartsState } from 'app-core/models/chart.model';
export const chartsEntities = createFeatureSelector<ChartsState>('Charts');

export const selectChartsIds = createSelector(chartsEntities, selectIds);
export const selectChartsEntities = createSelector(
  chartsEntities,
  selectEntities
);
export const selectAllCharts = createSelector(chartsEntities, selectAll);
export const selectTotalCharts = createSelector(chartsEntities, selectTotal);

export const selectChartEntity = (props: { id: string }) =>
  createSelector(selectAllCharts, entities => {
    return entities.find((value) => value.id === props.id);
  });


// @TODO  selectChartEntity replacement by selectCurrentChartId and selectCurrentChart
export const selectCurrentChartId = createSelector(
  chartsEntities,
  getSelectedChartId
);

export const selectCurrentChart = createSelector(
  selectChartsEntities,
  getSelectedChartId,
  (chartEntities, chartId) => chartId && chartEntities[chartId]
);
