import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { concatMap, of, Subject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { BaseSocketData, SocketMessage, SocketRequest} from 'app-core/models/socket-message';

@Injectable()
export class SocketService {
  private messageToSocket$ = new Subject<SocketRequest>();

  private messageFromSocket$ = new Subject<SocketMessage<BaseSocketData>>();
   messageFromWebSocket$ = this.messageFromSocket$.asObservable();

  worker: Worker | undefined;
  socketIsStarted = false;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (typeof Worker !== 'undefined' && isPlatformBrowser(this.platformId)) {
      this.worker = new Worker(
        new URL('../workers/socket.worker', import.meta.url)
      );

      const checkSocketIsStarted = new Subject<boolean>();

      this.worker.onmessage = ({ data }: MessageEvent<SocketMessage<BaseSocketData>>) => {
        if (data.event === 'SOCKET_IS_STARTED') {
          this.socketIsStarted = true;
          checkSocketIsStarted.next(true);
        } else {
          this.messageFromSocket$.next(data);
        }
      };

      this.messageToSocket$
        .pipe(
          concatMap((val: SocketRequest) =>
            this.socketIsStarted === true
              ? of(val)
              : checkSocketIsStarted.pipe(
                  filter((x) => !!x),
                  take(1),
                  map(() => val)
                )
          )
        )
        .subscribe((val) => {
          if (this.worker) {
            this.worker.postMessage(val);
          }
        });
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  sentMessageToSocket(event: string, data?: string | string[]) {
    this.messageToSocket$.next(data ? { event, data } : { event });
  }

}
