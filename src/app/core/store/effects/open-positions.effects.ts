import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  initialRatesLoad,
  initialRatesLoadSuccess,
  startRatesStream,
  updateRatesFromStreamSuccess,
} from 'app-core/store/actions/rate.actions';
import { concatMap, map } from 'rxjs/operators';
import {
  initialOpenPositionsLoad,
  initialOpenPositionsLoadSuccess, startOpenPositionsStream, updateOpenPositionsFromStreamSuccess,
} from 'app-core/store/actions/open-position.actions';
import { DataService } from 'app-core/services/data.service';

@Injectable()
export class OpenPositionsEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  initialOpenPositionsLoad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initialOpenPositionsLoad),
      concatMap(() => {
        return this.dataService
          .getInitialOpenPositions()
          .pipe(
            map((openPositions) => initialOpenPositionsLoadSuccess({ openPositions }))
          );
      })
    );
  });

  startOpenPositionsStream$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startOpenPositionsStream),
      concatMap(() => {
        return this.dataService
          .startOpenPositionsStream()
          .pipe(
            map((openPositions) =>
              updateOpenPositionsFromStreamSuccess({ openPositions })
            )
          );
      })
    );
  });
}
