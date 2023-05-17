import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { SocketService } from 'app-core/services/socket.service';

import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [SocketService],
})
export class AppBrowserModule {}
