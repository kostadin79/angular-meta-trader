import { TestBed } from '@angular/core/testing';
import {
  StoreWithSnapshots,
  provideStoreSnapshots,
} from 'app-core/utils/test.helper';

import { initialRatesLoadSuccess } from 'app-core/store/actions/rate.actions';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'app-core/store/core-store.module';
import { selectAllRates } from 'app-core/store/selectors/rates.selectors';
import { Rate } from 'app-core/models/rate.model';
import { RatesDirection } from 'app-core/models/enumerations';

describe('Rates Selectors', () => {
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
      expect(selectAllRates(store$.state)).toBeArray();
    });
  });

  describe('Selectors tests', () => {
    it('should have length 0 when nothing was reduced', () => {
      expect(selectAllRates(store$.state)).toHaveLength(0);
    });
  });

  describe('should selectors have data', () => {
    const ratesData: Rate[] = [
      {
        id: 'EURUSD',
        bid: 1.07192,
        ask: 1.07206,
        symbol: 'EURUSD',
        direction: RatesDirection.Down,
      },
      {
        id: 'USDJPY',
        bid: 140.124,
        ask: 140.139,
        symbol: 'USDJPY',
        direction: RatesDirection.Up,
      },
      {
        id: 'EURJPY',
        bid: 150.21,
        ask: 150.23,
        symbol: 'EURJPY',
        direction: RatesDirection.Initial,
      },
      {
        id: 'USDCAD',
        bid: 1.3634,
        ask: 1.3636,
        symbol: 'USDCAD',
        direction: RatesDirection.Initial,
      },
    ] as Rate[];

    beforeEach(() => {
      store$.dispatch(initialRatesLoadSuccess({ rates: ratesData }));
    });
    it('should have length 4 when data was reduced', () => {
      expect(selectAllRates(store$.state)).toHaveLength(4);
    });
    it('should have first element property EURUSD', () => {
      expect(selectAllRates(store$.state)[0].id).toBe('EURUSD');
    });
  });
});
