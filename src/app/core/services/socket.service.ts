import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket$: WebSocketSubject<any> = webSocket('ws://127.0.0.1:8888');
  public messageFromWebSocket$: Observable<any> = this.socket$.asObservable();

  sentMessageToSocket(event: string, data?: unknown) {
    if (this.socket$) {
      this.socket$.next(data ? { event, data } : { event });
    }
  }
}
