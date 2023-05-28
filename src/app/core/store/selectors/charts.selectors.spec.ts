import { TestBed } from '@angular/core/testing';
import {
  StoreWithSnapshots,
  provideStoreSnapshots,
} from 'app-core/utils/test.helper';

import { getChartSuccess } from 'app-core/store/actions/chart.actions';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'app-core/store/core-store.module';

import { selectAllCharts } from 'app-core/store/selectors/charts.selectors';
import { Chart } from 'app-core/models/chart.model';

describe('Chart Selectors', () => {
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
      expect(selectAllCharts(store$.state)).toBeArray();
    });

    it('should have length 0 when nothing was reduced', () => {
      expect(selectAllCharts(store$.state)).toHaveLength(0);
    });
  });

  describe('selectors should have data', () => {
    const chartsData: Chart = {
      id: 'EURJPY',
      chart: [
        {
          time: '2022.11.30 00:00',
          open: 143.102,
          low: 143.08,
          high: 144.84,
          close: 143.603,
          volume: 284051,
        },
        {
          time: '2022.12.01 00:00',
          open: 143.596,
          low: 141.895,
          high: 143.754,
          close: 142.187,
          volume: 332263,
        },
        {
          time: '2022.12.02 00:00',
          open: 142.205,
          low: 140.755,
          high: 142.473,
          close: 141.541,
          volume: 300427,
        },
        {
          time: '2022.12.05 00:00',
          open: 141.458,
          low: 141.449,
          high: 143.612,
          close: 143.27,
          volume: 233380,
        },
        {
          time: '2022.12.06 00:00',
          open: 143.267,
          low: 143.088,
          high: 143.992,
          close: 143.306,
          volume: 252637,
        },
      ],
    };

    beforeEach(() => {
      store$.dispatch(getChartSuccess({ chart: chartsData }));
    });
    it('should have length 4 when data was reduced', () => {
      expect(selectAllCharts(store$.state)).toHaveLength(1);
    });
    it('should have first element property symbol EURJPY', () => {
      expect(selectAllCharts(store$.state)[0].id).toBe('EURJPY');
    });
  });
});
