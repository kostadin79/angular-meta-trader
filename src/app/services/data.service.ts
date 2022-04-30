import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment, WS_ENDPOINT } from '../../environments/environment';
import { catchError, tap, switchAll, map, filter, take } from 'rxjs/operators';
import { EMPTY, Subject, Observable, throwError } from 'rxjs';
import { Rate } from '@terminal/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  ratesList: string[] = [
    'EURUSD',
    'USDJPY',
    'EURGBP',
    'GBPUSD',
    'EURJPY',
    'GBPJPY',
    'USDCAD',
    'EURCHF',
    'GBPCHF',
    'USDCHF',
    'CADCHF',
    'CHFJPY',
    'CADJPY',
    'GBPCAD',
    'EURCAD',
    'AUDUSD',
    'NZDUSD',
  ];
  private socket$: WebSocketSubject<any> = webSocket(
    'ws://localhost:4200/socket-ws'
  );

  private messageFromSocket$ = new Subject<any>();

  public ratesSource$: Observable<any> = this.messageFromSocket$ .asObservable()
    .pipe(filter((data) => data.event == 'PRICES'),map(val =>val.data));

  public accountSource$: Observable<any>;

  public openPositionsSource$: Observable<any> = this.messageFromSocket$.asObservable().pipe(
    filter(data => data.event == 'ORDERS'),map(val=> val.data));

  constructor() {
    this.socket$.subscribe(
      (data) => {
        // console.log('socket->',data);
        this.messageFromSocket$.next(data);
      },
      (error) => console.log(error)
    );

  }

  sentMessageToSocket(event: string, data?: any) {
    this.socket$.next(data ? { event, data} : {event});
  }

  startRatesStream() {
    this.sentMessageToSocket('SUBSCRIBE_RATES', this.ratesList);
  }
  stopRatesStream(){
    this.sentMessageToSocket('UNSUBSCRIBE_RATES', this.ratesList);
  }

  getInitialRates(): Observable<Rate[]> {
    this.sentMessageToSocket('MULTIPLE_RATES', this.ratesList);
    return this.messageFromSocket$.asObservable().pipe(
      filter((data) => data.event == 'MULTIPLE_RATES'),
      map((val) => val.data),
      tap(() => {
        this.startRatesStream();
      }),
      take(1)
    );
  }
  getInitialOpenPositions():any{
    this.sentMessageToSocket('OPEN_POSITIONS');
    return this.messageFromSocket$.asObservable().pipe(
      filter((data) => data.event == 'OPEN_POSITIONS'),
      map((val) => val.data),
      tap(() => {
        this.startOpenPositionsStream();
      }),
      take(1)
    );
  }

  startOpenPositionsStream():void{
    this.sentMessageToSocket('SUBSCRIBE_OPEN_POSITIONS');
  }
  stopOpenPositionStream(){
    this.sentMessageToSocket('UNSUBSCRIBE_OPEN_POSITIONS');
  }

  getChart(symbol:string):Observable<any>{
    this.sentMessageToSocket('CHART',symbol);
    return this.messageFromSocket$.asObservable().pipe(
      filter((data) => data.event == 'CHART'),
      map((val) => val.data),
      take(1)
    );
  }

}
