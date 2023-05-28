import { TestBed } from '@angular/core/testing';
import {
  StoreWithSnapshots,
  provideStoreSnapshots,
} from 'app-core/utils/test.helper';

import { initialOpenPositionsLoadSuccess } from 'app-core/store/actions/open-position.actions';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'app-core/store/core-store.module';
import { selectAllOpenPositions } from 'app-core/store/selectors/open-positions.selectors';
import { OpenPosition } from "app-core/models/open-position.model";

describe('Open Positions Selectors', () => {
  let store$: StoreWithSnapshots;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [provideStoreSnapshots()],
    });

    store$ = TestBed.inject(StoreWithSnapshots);
  });

  describe('initial state', () => {
    it('should be empty when in initial state', () => {
      expect(selectAllOpenPositions(store$.state)).toBeArray();
    });
  });

  describe('Selector tests', () => {
    it('should have length 0 when nothing was reduced', () => {
      expect(selectAllOpenPositions(store$.state)).toHaveLength(0);
    });
  });

  describe('selectors should have data', () => {
    const openPositionsData: OpenPosition[] = [
      {
        id: 87559206,
        order: 87559206,
        open_time: '2023.05.10 23:19',
        type: 1,
        volume: 0.03,
        symbol: 'EURJPY',
        price: 147.524,
        sl: 0,
        tp: 0,
        commission: 0,
        swap: -6.16,
        profit: -64.45,
        comment: '',
      },
      {
        id: 87559234,
        order: 87559234,
        open_time: '2023.05.10 23:20',
        type: 1,
        volume: 0.03,
        symbol: 'GBPJPY',
        price: 169.644,
        sl: 0,
        tp: 0,
        commission: 0,
        swap: -8.77,
        profit: -79.76,
        comment: '',
      },
    ];

    beforeEach(() => {
      store$.dispatch(
        initialOpenPositionsLoadSuccess({ openPositions: openPositionsData })
      );
    });
    it('should have length 2 when data was reduced', () => {
      expect(selectAllOpenPositions(store$.state)).toHaveLength(2);
    });
    it('should have first element property symbol EURJPY', () => {
      expect(selectAllOpenPositions(store$.state)[0].symbol).toBe('EURJPY');
    });
  });
});
