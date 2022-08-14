import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import {
  loadConnectWebsockets,
  loadConnectWebsocketsSuccess,
} from 'app-core/store/actions/configuration.actions';
import { concatMap, map, tap, filter } from 'rxjs/operators';
import { DataService } from 'app-core/services/data.service';

const ACTION_TYPE = 'Transfer State from SSR';

@Injectable()
export class ConfigurationEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ACTION_TYPE),
      filter(() => isPlatformBrowser(this.platformId)),
      concatMap(() => [loadConnectWebsockets()])
    );
  });

  loadWebSocket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadConnectWebsockets),
      tap(() => {
        this.dataService.startWebSocket();
      }),
      map(loadConnectWebsocketsSuccess)
    );
  });
}
