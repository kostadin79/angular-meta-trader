import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app-core/models/general-state';
import { getChart } from 'app-core/store/actions/chart.actions';
import {
  selectAllCharts,
  selectChartEntity,
  selectChartsEntities,
  selectChartsIds,
  selectTotalCharts,
} from 'app-core/store/selectors/charts.selectors';

@Injectable({
  providedIn: 'root',
})
export class ChartsFacade {
  constructor(private store: Store<AppState>) {}

  getChart(chart: string) {
    this.store.dispatch(getChart({ chart }));
  }

  getAllChartsIds() {
    return this.store.pipe(select(selectChartsIds));
  }

  getChartsEntities() {
    return this.store.pipe(select(selectChartsEntities));
  }

  getAllCharts() {
    return this.store.pipe(select(selectAllCharts));
  }

  gtTotalCharts() {
    return this.store.pipe(select(selectTotalCharts));
  }

  getChartById(id: string) {
    return this.store.pipe(select(selectChartEntity({ id })));
  }
}
