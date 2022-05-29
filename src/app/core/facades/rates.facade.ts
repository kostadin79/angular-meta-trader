import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { AppState } from 'app-core/models/general-state';
import {
  initialRatesLoad,
  startRatesStream,
} from 'app-core/store/actions/rate.actions';
import {
  selectAllRates,
  selectRatesEntities,
  selectRatesIds,
  selectTotalRates,
} from 'app-core/store/selectors/rates.selectors';

@Injectable({
  providedIn: 'root',
})
export class RatesFacade {
  constructor(private store: Store<AppState>) {}

  // webSocketStatus$: Observable<boolean> = this.store.pipe(select(socketStatus));
  //
  // configuration$: Observable<ConfigurationState> = this.store.pipe(
  //   select(appConfiguration)
  // );

  loadInitialRates() {
    this.store.dispatch(initialRatesLoad());
  }

  startRatesStream() {
    this.store.dispatch(startRatesStream());
  }

  getSelectedRate() {
    return this.store.pipe(select(selectRatesIds));
  }

  getRatesEntities() {
    return this.store.pipe(select(selectRatesEntities));
  }

  getAllRates() {
    return this.store.pipe(select(selectAllRates));
  }

  gtTotalRates() {
    return this.store.pipe(select(selectTotalRates));
  }
}
