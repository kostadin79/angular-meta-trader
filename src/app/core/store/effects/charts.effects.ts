import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map } from 'rxjs/operators';
import {
  getChart,
  getChartSuccess,
} from 'app-core/store/actions/chart.actions';
import { DataService } from 'app-core/services/data.service';

@Injectable()
export class ChartsEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  getChartsLoad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getChart),
      concatMap((value: { chart: string}) => {
        return this.dataService
          .getChart(value.chart)
          .pipe(map((chart) => getChartSuccess({ chart })));
      })
    );
  });
}
