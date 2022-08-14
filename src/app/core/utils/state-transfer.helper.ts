import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { Action, ActionReducer, Store } from '@ngrx/store';
import { first, take } from 'rxjs/operators';
import { AppState } from 'app-core/models/general-state';

export const NGRX_STATE_SSR = makeStateKey<object>('ngrxState');

const ACTION_TYPE = 'Transfer State from SSR';

export function setStateOnBrowser(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action) => {
    if (action.type === ACTION_TYPE) {
      const transferredState: AppState = ( action as Action & { payload: AppState }).payload;
      return reducer({ ...state, ...transferredState }, action);
    }
    return reducer(state, action);
  };
}

export function stateTransferFromServerToBrowser(
  transferState: TransferState,
  store: Store,
  actions: Actions
) {
  return () => {
    if (transferState.hasKey(NGRX_STATE_SSR)) {
      // browser
      actions.pipe(first()).subscribe(() => {
        const state = transferState.get<object>(NGRX_STATE_SSR, {});
        transferState.remove(NGRX_STATE_SSR);
        store.dispatch({ type: ACTION_TYPE, payload: state });
      });
    } else {
      // server
      transferState.onSerialize(NGRX_STATE_SSR, () => {
        let state;
        store.pipe(take(1)).subscribe((saveState: object) => {
          state = saveState;
        });
        return state;
      });
    }
  };
}
