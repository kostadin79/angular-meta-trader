import { Injectable, Optional, SkipSelf } from '@angular/core';
import { map, filter, take, switchMap, tap, catchError } from 'rxjs/operators';
import { Subject, Observable, of, throwError } from 'rxjs';
import { BaseRate, Rate } from '../models/rate.model';
import { BaseOpenPosition, OpenPosition } from '../models/open-position.model';
import { ratesList } from '../../../environments/environment';
import { SocketMessage } from '../models/socket-message';
import { Chart, BaseChart } from '../models/chart.model';
import {
  convertChart,
  convertOpenPositions,
  convertRates,
} from 'app-core/utils/utils';
import { SocketService } from 'app-core/services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  ratesList: string[] = ratesList;

  private messageFromSocket$: Subject<any> = new Subject();

  public ratesSource$: Observable<Rate[]> = this.messageFromSocket$
    .asObservable()
    .pipe(
      filter((data: SocketMessage<BaseRate>) => data.event === 'PRICES'),
      map((val: SocketMessage<BaseRate>): BaseRate[] => val.data),
      map((val: BaseRate[]) => convertRates(val))
    );

  // public accountSource$: Observable<any>;

  public openPositionsSource$: Observable<OpenPosition[]> =
    this.messageFromSocket$.asObservable().pipe(
      filter((data: SocketMessage<OpenPosition>) => data.event == 'ORDERS'),
      map((val: SocketMessage<OpenPosition>) => val.data),
      map((val: BaseOpenPosition[]) => convertOpenPositions(val))
    );

  constructor(@Optional() private socketService: SocketService) {}

  startWebSocket() {
    of(true)
      .pipe(
        switchMap(() =>
          this.socketService.messageFromWebSocket$.pipe(
            tap((data) => {
              this.messageFromSocket$.next(data);
            }),
            catchError((error) => throwError(error))
          )
        )
      )
      .subscribe();
  }

  sentMessageToSocket(event: string, data?: unknown) {
    this.socketService.sentMessageToSocket(event, data);
  }

  startRatesStream() {
    this.sentMessageToSocket('SUBSCRIBE_RATES', this.ratesList);
    return this.ratesSource$;
  }
  stopRatesStream() {
    this.sentMessageToSocket('UNSUBSCRIBE_RATES', this.ratesList);
  }

  getInitialRates(): Observable<Rate[]> {
    this.sentMessageToSocket('MULTIPLE_RATES', this.ratesList);
    return this.messageFromSocket$.asObservable().pipe(
      filter((data: SocketMessage<BaseRate>) => data.event == 'MULTIPLE_RATES'),
      map((val: SocketMessage<BaseRate>) => val.data),
      map((rates: BaseRate[]) => convertRates(rates)),
      take(1)
    );
  }

  getInitialOpenPositions(): Observable<OpenPosition[]> {
    this.sentMessageToSocket('OPEN_POSITIONS');
    return this.messageFromSocket$.asObservable().pipe(
      filter(
        (data: SocketMessage<BaseOpenPosition>) =>
          data.event === 'OPEN_POSITIONS'
      ),
      map((val: SocketMessage<BaseOpenPosition>) => val.data),
      map((val: BaseOpenPosition[]) => convertOpenPositions(val)),
      take(1)
    );
  }

  startOpenPositionsStream() {
    this.sentMessageToSocket('SUBSCRIBE_OPEN_POSITIONS');
    return this.openPositionsSource$;
  }
  stopOpenPositionStream() {
    this.sentMessageToSocket('UNSUBSCRIBE_OPEN_POSITIONS');
  }

  getChart(symbol: string): Observable<Chart> {
    this.sentMessageToSocket('CHART', symbol);
    return this.messageFromSocket$.asObservable().pipe(
      filter((data: SocketMessage<BaseChart>) => data.event === 'CHART'),
      map((val) => val.data),
      map((val: BaseChart[]) => convertChart(val, symbol)),
      take(1)
    );
  }
}
