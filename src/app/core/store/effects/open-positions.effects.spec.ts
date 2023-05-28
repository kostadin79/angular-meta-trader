import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, Subject } from 'rxjs';

import { OpenPositionsEffects } from './open-positions.effects';
import { DataService } from 'app-core/services/data.service';
import { instance, mock, verify, when } from 'ts-mockito';
import { Action, StoreModule} from '@ngrx/store';

import {
  initialOpenPositionsLoad,
  initialOpenPositionsLoadSuccess,
  startOpenPositionsStream,
  updateOpenPositionsFromStreamSuccess,
} from 'app-core/store/actions/open-position.actions';

import { OpenPosition } from 'app-core/models/open-position.model';
import { take } from 'rxjs/operators';
import { reducers } from 'app-core/store/core-store.module';

describe('Open Position effects', () => {
  let actions$: Observable<Action>;
  let effects: OpenPositionsEffects;
  let dataServiceMock: DataService;
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
    dataServiceMock = mock(DataService);
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        OpenPositionsEffects,
        provideMockActions(() => actions$),
        { provide: DataService, useFactory: () => instance(dataServiceMock) },
      ],
    });

    effects = TestBed.inject(OpenPositionsEffects);
  });
  beforeEach(() => {
    when(dataServiceMock.getInitialOpenPositions()).thenCall(() => of(openPositionsData as OpenPosition[]));
    when(dataServiceMock.startOpenPositionsStream()).thenCall(() =>
      of(openPositionsData as OpenPosition[])
    );
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  it('should call DataService when handling initialOpenPositionsLoad action', done => {
    actions$ = of(initialOpenPositionsLoad());

    effects.initialOpenPositionsLoad$.subscribe(() => {
      verify(dataServiceMock.getInitialOpenPositions()).once();
      done();
    });
  });

  it('should return initialOpenPositionsLoadSuccess after initialOpenPositionsLoad',  (done) => {
      const testComplete$ = new Subject<void>();

    actions$ = of(initialOpenPositionsLoad());

    testComplete$.pipe(take(2)).subscribe({ complete: done });

    effects.initialOpenPositionsLoad$.subscribe({
      next: (data) => {
        expect(data.type).toEqual(initialOpenPositionsLoadSuccess.type);
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });

  it('should call DataService when handling startOpenPositionsStream action', done => {
    actions$ = of(startOpenPositionsStream());
    effects.startOpenPositionsStream$.subscribe(() => {
      verify(dataServiceMock.startOpenPositionsStream()).once();
      done();
    });
  });

  it('should return startOpenPositionsStream after updateOpenPositionsFromStreamSuccess', done => {
    const testComplete$ = new Subject<void>();
    actions$ = of(startOpenPositionsStream());
    testComplete$.pipe(take(2)).subscribe({ complete: done });
    effects.startOpenPositionsStream$.subscribe({
      next: data => {
        expect(data.type).toEqual(updateOpenPositionsFromStreamSuccess.type);
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });

});
