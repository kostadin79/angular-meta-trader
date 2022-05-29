import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllOpenPositions,
  selectOpenPositionsEntities,
  selectOpenPositionsIds,
  selectTotalOpenPositions,
} from 'app-core/store/selectors/open-positions.selectors';
import { initialOpenPositionsLoad, startOpenPositionsStream} from 'app-core/store/actions/open-position.actions';

@Injectable({
  providedIn: 'root',
})
export class OpenPositionFacade {
  constructor(private store: Store) {}

  loadInitialOpenPositions() {
    this.store.dispatch(initialOpenPositionsLoad());
  }

  startOpenPositionsStream() {
    this.store.dispatch(startOpenPositionsStream());
  }

  getSelectedOpenPositions() {
    return this.store.select(selectOpenPositionsIds);
  }

  getOpenPositionsEntities() {
    return this.store.select(selectOpenPositionsEntities);
  }

  getAllOpenPositions() {
    return this.store.select(selectAllOpenPositions);
  }

  gtTotalOpenPositions() {
    return this.store.select(selectTotalOpenPositions);
  }
}
