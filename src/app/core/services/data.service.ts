import { Injectable, Optional } from '@angular/core';
import { map, filter, take } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { BaseRate, Rate } from '../models/rate.model';
import { BaseOpenPosition, OpenPosition } from '../models/open-position.model';
import { ratesList } from '../../../environments/environment';
import { BaseSocketData, SocketMessage } from '../models/socket-message';
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

  constructor(@Optional() private socketService: SocketService) {}

  startWebSocket() {
    if (this.socketService) {
      this.socketService.startWebSocket();
    }
  }
  checkIsSocketIsConnected(){
    if (this.socketService) {
      return this.socketService.startedSocket
    } else {
      return of(false);
    }
  }

  sentMessageToSocket(event: string, data?: string | string[]) {
    if (this.socketService) {
      this.socketService.sentMessageToSocket(event, data);
    }
  }

  startRatesStream(): Observable<Rate[]> {
    this.sentMessageToSocket('SUBSCRIBE_RATES', this.ratesList);
    return this.socketService.messageFromWebSocket$.pipe(
      filter((data: SocketMessage<BaseSocketData>) => data.event === 'PRICES'),
      map((val: SocketMessage<BaseRate>) => val.data),
      map((val: BaseRate[]) => convertRates(val))
    );
  }

  stopRatesStream() {
    this.sentMessageToSocket('UNSUBSCRIBE_RATES', this.ratesList);
  }

  getInitialRates(): Observable<Rate[]> {
    this.sentMessageToSocket('MULTIPLE_RATES', this.ratesList);
    return this.socketService.messageFromWebSocket$.pipe(
      filter((data: SocketMessage<BaseSocketData>) => data.event === 'MULTIPLE_RATES'),
      map((val: SocketMessage<BaseRate>) => val.data),
      map((rates: BaseRate[]) => convertRates(rates)),
      take(1)
    );
  }

  getInitialOpenPositions(): Observable<OpenPosition[]> {
    this.sentMessageToSocket('OPEN_POSITIONS');
    return this.socketService.messageFromWebSocket$.pipe(
      filter(
        (data: SocketMessage<BaseSocketData>) => data.event === 'OPEN_POSITIONS'
      ),
      map((val: SocketMessage<BaseOpenPosition>) => val.data),
      map((val: BaseOpenPosition[]) => convertOpenPositions(val)),
      take(1)
    );
  }

  startOpenPositionsStream(): Observable<OpenPosition[]> {
    this.sentMessageToSocket('SUBSCRIBE_OPEN_POSITIONS');
    return this.socketService.messageFromWebSocket$.pipe(
      filter((data: SocketMessage<BaseSocketData>) => data.event === 'ORDERS'),
      map((val: SocketMessage<BaseOpenPosition>) => val.data),
      map((val: BaseOpenPosition[]) => convertOpenPositions(val))
    );
  }
  stopOpenPositionStream() {
    this.sentMessageToSocket('UNSUBSCRIBE_OPEN_POSITIONS');
  }

  getChart(symbol: string): Observable<Chart> {
    this.sentMessageToSocket('CHART', symbol);
    return this.socketService.messageFromWebSocket$.pipe(
      filter((data: SocketMessage<BaseSocketData>) => data.event === 'CHART'),
      map((val: SocketMessage<BaseChart>) => val.data),
      map((val: BaseChart[]) => convertChart(val, symbol)),
      take(1)
    );
  }
}
