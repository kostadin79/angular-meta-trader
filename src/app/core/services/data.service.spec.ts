import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { SocketService } from 'app-core/services/socket.service';
import {
  anything,
  instance,
  mock,
  verify,
  when
} from "ts-mockito";
import { take } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { BaseSocketData, SocketMessage } from 'app-core/models/socket-message';

describe('DataService', () => {
  let service: DataService;
  let socketServiceMock: SocketService;
  beforeEach(() => {
    socketServiceMock = mock(SocketService);
    TestBed.configureTestingModule({
      imports:[],
      providers:[
        { provide: SocketService, useFactory: () => instance(socketServiceMock) },
      ]
    });
    service = TestBed.inject(DataService)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call socket service when sent message', () => {
    service.sentMessageToSocket(anything(), anything());
    verify(
      socketServiceMock.sentMessageToSocket(anything(), anything())
    ).once();
  });

  it('should have value EURUSD when subscribe to rates stream', done => {
    const ratesData: SocketMessage<BaseSocketData> = {
      event: 'PRICES', data: [
        {
          bid: 1.07192,
          ask: 1.07206,
          symbol: 'EURUSD',
        },
        {
          bid: 140.124,
          ask: 140.139,
          symbol: 'USDJPY',
        },
        {
          bid: 150.21,
          ask: 150.23,
          symbol: 'EURJPY',
        },
        {
          bid: 1.3634,
          ask: 1.3636,
          symbol: 'USDCAD',
        },
      ]
    } as SocketMessage<BaseSocketData>;
    when(socketServiceMock.messageFromWebSocket$).thenReturn(of(ratesData));

    const testComplete$ = new Subject<void>();
    testComplete$.pipe(take(2)).subscribe({ complete: done });

    service.startRatesStream().subscribe({
      next: (data) => {
        expect(data[0].id).toBe('EURUSD');
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });

  it('should have value EURUSD when subscribe to rates stream with multiple rates', done => {
    const ratesData: SocketMessage<BaseSocketData> = {
      event: 'MULTIPLE_RATES', data: [
        {
          bid: 1.07192,
          ask: 1.07206,
          symbol: 'EURUSD',
        },
        {
          bid: 140.124,
          ask: 140.139,
          symbol: 'USDJPY',
        },
        {
          bid: 150.21,
          ask: 150.23,
          symbol: 'EURJPY',
        },
        {
          bid: 1.3634,
          ask: 1.3636,
          symbol: 'USDCAD',
        },
      ]
    } as SocketMessage<BaseSocketData>;
    when(socketServiceMock.messageFromWebSocket$).thenReturn(of(ratesData));
    const testComplete$ = new Subject<void>();
    testComplete$.pipe(take(2)).subscribe({ complete: done });

    service.getInitialRates().subscribe({
      next: data => {
        expect(data[0].id).toBe('EURUSD');
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });

  it('should have correct order number when subscribe to get all open positions', done => {
    const openPositionsData: SocketMessage<BaseSocketData> = {
      event: 'OPEN_POSITIONS', data: [
        {
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
        }
      ]
    } as SocketMessage<BaseSocketData>;
    when(socketServiceMock.messageFromWebSocket$).thenReturn(of(openPositionsData));
    const testComplete$ = new Subject<void>();
    testComplete$.pipe(take(2)).subscribe({ complete: done });

    service.getInitialOpenPositions().subscribe({
      next: data => {
        expect(data[0].order).toBe(87559206);
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });
  it('should have correct order number when subscribe to open positions stream', done => {
    const openPositionsDataStream: SocketMessage<BaseSocketData> = {
      event: 'ORDERS', data: [
        {
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
        }
      ]
    } as SocketMessage<BaseSocketData>;
    when(socketServiceMock.messageFromWebSocket$).thenReturn(of(openPositionsDataStream));
    const testComplete$ = new Subject<void>();
    testComplete$.pipe(take(2)).subscribe({ complete: done });

    service.startOpenPositionsStream().subscribe({
      next: data => {
        expect(data[0].order).toBe(87559206);
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });

  it('should have correct data for charts', done => {
    const chartData: SocketMessage<BaseSocketData> = {
      event: 'CHART', data: [
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
      ]
    } as SocketMessage<BaseSocketData>;
    when(socketServiceMock.messageFromWebSocket$).thenReturn(of(chartData));
    const testComplete$ = new Subject<void>();
    testComplete$.pipe(take(2)).subscribe({ complete: done });

    service.getChart('EURJPY').subscribe({
      next: data => {
        expect(data.chart[0].high).toBe(144.84);
        testComplete$.next();
      },
      error: fail,
      complete: () => testComplete$.next(),
    });
  });
});
