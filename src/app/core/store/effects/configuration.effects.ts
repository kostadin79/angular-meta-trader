import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { loadConnectWebsockets } from 'app-core/store/actions/connect-websocket.actions';
import { concatMap } from 'rxjs/operators';
@Injectable()
export class ConfigurationEffects {
  constructor(private actions$: Actions) {}

  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ROOT_EFFECTS_INIT),
  //     concatMap(() => [loadConnectWebsockets()])
  //   )
  // );
  // loadWebSocket$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadConnectWebsockets),
  //     concatMap(() => [loadConnectWebsockets()])
  //   )
  // );


}
