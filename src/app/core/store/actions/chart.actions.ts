import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Chart } from 'app-core/models/chart.model';

export const getChart = createAction(
  '[Chart/API] Get Chart',
  props<{ chart: string }>()
);
export const getChartSuccess = createAction(
  '[Chart/API] Get Chart Success',
  props<{ chart: Chart }>()
);

export const loadCharts = createAction(
  '[Chart/API] Load Charts',
  props<{ charts: Chart[] }>()
);

export const addChart = createAction(
  '[Chart/API] Add Chart',
  props<{ chart: Chart }>()
);

export const upsertChart = createAction(
  '[Chart/API] Upsert Chart',
  props<{ chart: Chart }>()
);

export const addCharts = createAction(
  '[Chart/API] Add Charts',
  props<{ charts: Chart[] }>()
);

export const upsertCharts = createAction(
  '[Chart/API] Upsert Charts',
  props<{ charts: Chart[] }>()
);

export const updateChart = createAction(
  '[Chart/API] Update Chart',
  props<{ chart: Update<Chart> }>()
);

export const updateCharts = createAction(
  '[Chart/API] Update Charts',
  props<{ charts: Update<Chart>[] }>()
);

export const deleteChart = createAction(
  '[Chart/API] Delete Chart',
  props<{ id: string }>()
);

export const deleteCharts = createAction(
  '[Chart/API] Delete Charts',
  props<{ ids: string[] }>()
);

export const clearCharts = createAction('[Chart/API] Clear Charts');
