import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  selectAllOpenPositions,
  selectOpenPositionsEntities,
  selectOpenPositionsIds,
  selectTotalOpenPositions,
} from 'app-core/store/selectors/open-positions.selectors';

@Injectable({
  providedIn: 'root',
})
export class OpenPositionFacade {
  constructor(private store: Store) {}

  getSelectedOpenPositions() {
    return this.store.pipe(select(selectOpenPositionsIds));
  }

  getOpenPositionsEntities() {
    return this.store.pipe(select(selectOpenPositionsEntities));
  }

  getAllOpenPositions() {
    return this.store.pipe(select(selectAllOpenPositions));
  }

  gtTotalOpenPositions() {
    return this.store.pipe(select(selectTotalOpenPositions));
  }
}
