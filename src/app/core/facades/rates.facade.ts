import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app-core/models/general-state';
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

  getSelectedRate() {
    return this.store.select(selectRatesIds);
  }

  getRatesEntities() {
    return this.store.select(selectRatesEntities);
  }

  getAllRates() {
    return this.store.select(selectAllRates);
  }

  gtTotalRates() {
    return this.store.select(selectTotalRates);
  }
}
