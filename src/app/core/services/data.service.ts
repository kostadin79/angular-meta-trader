import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { tap, map, filter, take } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Rate } from '../models/rates';
import { OpenPosition } from '../models/open-position';
import { ratesList } from '../../../environments/environment';
import { SocketMessage } from '../models/socket-message';
import { Chart } from '../models/chart';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  ratesList: string[] = ratesList;

  private socket$: WebSocketSubject<any> = webSocket('ws://127.0.0.1:8888');

  private messageFromSocket$: Subject<any> = new Subject();

  public ratesSource$: Observable<Rate[]> = this.messageFromSocket$
    .asObservable()
    .pipe(
      filter((data: SocketMessage<Rate>) => data.event === 'PRICES'),
      map((val: SocketMessage<Rate>): Rate[] => val.data)
    );

  // public accountSource$: Observable<any>;

  public openPositionsSource$: Observable<OpenPosition[]> =
    this.messageFromSocket$.asObservable().pipe(
      filter((data: SocketMessage<OpenPosition>) => data.event == 'ORDERS'),
      map((val: SocketMessage<OpenPosition>) => val.data)
    );

  constructor() {
    this.socket$.subscribe(
      (data) => {
        // console.log('socket->',data);
        this.messageFromSocket$.next(data);
      },
      (error) => console.log(error)
    );
  }

  sentMessageToSocket(event: string, data?: unknown) {
    this.socket$.next(data ? { event, data } : { event });
  }

  startRatesStream() {
    this.sentMessageToSocket('SUBSCRIBE_RATES', this.ratesList);
  }
  stopRatesStream() {
    this.sentMessageToSocket('UNSUBSCRIBE_RATES', this.ratesList);
  }

  getInitialRates(): Observable<Rate[]> {
    this.sentMessageToSocket('MULTIPLE_RATES', this.ratesList);
    return this.messageFromSocket$.asObservable().pipe(
      filter((data: SocketMessage<Rate>) => data.event == 'MULTIPLE_RATES'),
      map((val: SocketMessage<Rate>) => val.data),
      tap(() => {
        this.startRatesStream();
      }),
      take(1)
    );
  }
  getInitialOpenPositions(): Observable<OpenPosition[]> {
    this.sentMessageToSocket('OPEN_POSITIONS');
    return this.messageFromSocket$.asObservable().pipe(
      filter(
        (data: SocketMessage<OpenPosition>) => data.event === 'OPEN_POSITIONS'
      ),
      map((val) => val.data),
      tap(() => {
        this.startOpenPositionsStream();
      }),
      take(1)
    );
  }

  startOpenPositionsStream(): void {
    this.sentMessageToSocket('SUBSCRIBE_OPEN_POSITIONS');
  }
  stopOpenPositionStream() {
    this.sentMessageToSocket('UNSUBSCRIBE_OPEN_POSITIONS');
  }

  getChart(symbol: string): Observable<Chart[]> {
    this.sentMessageToSocket('CHART', symbol);
    return this.messageFromSocket$.asObservable().pipe(
      filter((data: SocketMessage<Chart>) => data.event === 'CHART'),
      map((val) => val.data),
      take(1)
    );
  }
}
