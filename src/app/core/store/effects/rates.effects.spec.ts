import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, Subject } from 'rxjs';

import { RatesEffects } from './rates.effects';
import { DataService } from 'app-core/services/data.service';
import { instance, mock, verify, when } from 'ts-mockito';
import { Action, Store, StoreModule} from '@ngrx/store';

import {
  initialRatesLoad,
  initialRatesLoadSuccess,
  startRatesStream,
  updateRatesFromStreamSuccess,
} from 'app-core/store/actions/rate.actions';

import { take } from 'rxjs/operators';
import { RatesDirection } from 'app-core/models/enumerations';
import { Rate } from 'app-core/models/rate.model';
import { reducers } from "app-core/store/core-store.module";

describe('Rates effects', () => {
  let actions$: Observable<Action>;
  let effects: RatesEffects;
  let dataServiceMock: DataService;
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
  let store: Store;

  beforeEach(() => {
    dataServiceMock = mock(DataService);
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        RatesEffects,
        provideMockActions(() => actions$),
        { provide: DataService, useFactory: () => instance(dataServiceMock) },
      ],
    });

    effects = TestBed.inject(RatesEffects);
    store = TestBed.inject(Store);
  });
  beforeEach(() => {
    when(dataServiceMock.getInitialRates()).thenCall(() => of(ratesData as Rate[]));
    when(dataServiceMock.startRatesStream()).thenCall(() => of(ratesData as Rate[]));
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  it('should call DataService when handling initialRatesLoad action', done => {
    actions$ = of(initialRatesLoad());

    effects.initialRatesLoad$.subscribe(() => {
      verify(dataServiceMock.getInitialRates()).once();
      done();
    });
  });

  it('should return initialRatesLoadSuccess after initialRatesLoad', (done) => {
    const testComplete$ = new Subject<void>();

    actions$ = of(initialRatesLoad());

    testComplete$.pipe(take(2)).subscribe({ complete: done });

    effects.initialRatesLoad$.subscribe({
      next: (data) => {
        expect(data.type).toEqual(initialRatesLoadSuccess.type);
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });

  it('should call DataService when handling startRatesStream action', done => {
    actions$ = of(startRatesStream());

    effects.startRatesStream$.subscribe(() => {
      verify(dataServiceMock.startRatesStream()).once();
      done();
    });
  });

  it('should return startRatesStream after updateOpenPositionsFromStreamSuccess', (done) => {
    const testComplete$ = new Subject<void>();

    actions$ = of(startRatesStream());

    testComplete$.pipe(take(2)).subscribe({ complete: done });

    effects.startRatesStream$.subscribe({
      next: data => {
        expect(data.type).toEqual(updateRatesFromStreamSuccess.type);
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });

});
