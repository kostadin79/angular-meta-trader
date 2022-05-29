import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import {
  loadConnectWebsockets,
  loadConnectWebsocketsSuccess,
} from 'app-core/store/actions/configuration.actions';
import { concatMap, map, tap} from 'rxjs/operators';
import { DataService } from 'app-core/services/data.service';

@Injectable()
export class ConfigurationEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      concatMap(() => [loadConnectWebsockets()])
    )
  );

  loadWebSocket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConnectWebsockets),
      tap(() => {
        this.dataService.startWebSocket();
      }),
      map(loadConnectWebsocketsSuccess)
    )
  );
}
