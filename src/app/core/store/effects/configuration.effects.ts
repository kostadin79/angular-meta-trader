import { Inject, Injectable, isDevMode, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Actions,
  createEffect,
  ROOT_EFFECTS_INIT,
  ofType,
} from '@ngrx/effects';
import {
  loadConnectWebsockets,
  loadConnectWebsocketsSuccess,
} from 'app-core/store/actions/configuration.actions';
import {
  concatMap,
  map,
  filter,
  take,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { DataService } from 'app-core/services/data.service';
import { select, Store } from '@ngrx/store';
import {
  openPositionStreamStatus,
  ratesStreamStatus,
  socketStatus
} from 'app-core/store/selectors/configuration.selectors';
import { routerNavigationAction } from '@ngrx/router-store';
import { mapToPayload } from 'app-core/utils/rxjs.helper';
import {
  initialRatesLoad,
  stopRatesStream
} from 'app-core/store/actions/rate.actions';
import {
  initialOpenPositionsLoad,
  stopOpenPositionsStream
} from 'app-core/store/actions/open-position.actions';
import {getChart} from 'app-core/store/actions/chart.actions';

const ACTION_TYPE = 'Transfer State from SSR';

@Injectable()
export class ConfigurationEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  initDev$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      filter(
        () => isPlatformBrowser(this.platformId) && isDevMode()
      ),
      map(loadConnectWebsockets)
    )
  );

  initProd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTION_TYPE),
      filter(
        () => isPlatformBrowser(this.platformId) && !isDevMode()
      ),
      map(loadConnectWebsockets)
    )
  );

  loadWebSocket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConnectWebsockets),
      filter(() => isPlatformBrowser(this.platformId)),
      withLatestFrom(this.store.pipe(select(socketStatus))),
      filter(([, status]) => !status),
      tap(() => {
        this.dataService.startWebSocket();
      }),
      concatMap(() => this.dataService.checkIsSocketIsConnected().pipe(
          filter(x => !!x),
          take(1),
          map(loadConnectWebsocketsSuccess)
        )
    )
    ));

  startRatesOpenPositionsStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(() => isPlatformBrowser(this.platformId)),
      mapToPayload(),
      map((val) => val.routerState),
      filter(val => val.url === '/dashboard'),
      concatMap(() =>  this.store.pipe(
          select(socketStatus),
          filter(status => !!status),
          take(1),
          concatMap(() => [initialRatesLoad(), initialOpenPositionsLoad(), getChart({chart: 'EURJPY'})])
        )
      )
    )
  );
  stopRatesOpenPositionsStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(() => isPlatformBrowser(this.platformId)),
      mapToPayload(),
      map((val) => val.routerState),
      filter((val) => val.url !== '/dashboard'),
      withLatestFrom(this.store.pipe(select(ratesStreamStatus)),this.store.pipe(select(openPositionStreamStatus))),
      filter(([,ratesStatus,positionsStatus]) => !!ratesStatus && !!positionsStatus),
        concatMap(() => [stopRatesStream(),stopOpenPositionsStream()]))
  );
}
