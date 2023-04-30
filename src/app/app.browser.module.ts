import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { SocketService } from 'app-core/services/socket.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    BrowserTransferStateModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [SocketService],
})
export class AppBrowserModule {}
