import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {concatMap, map, switchMap, tap} from 'rxjs/operators';
import {
  initialOpenPositionsLoad,
  initialOpenPositionsLoadSuccess,
  startOpenPositionsStream, stopOpenPositionsStream,
  updateOpenPositionsFromStreamSuccess,
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
            concatMap(openPositions => [initialOpenPositionsLoadSuccess({ openPositions }), startOpenPositionsStream()])
          )
      })
    );
  });

  startOpenPositionsStream$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startOpenPositionsStream),
      switchMap(() => {
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

  stopOpenPositionsStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stopOpenPositionsStream),
      tap(() => this.dataService.stopOpenPositionStream())
    ), {dispatch: false}
  );
}
