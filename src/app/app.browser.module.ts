import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { SocketService } from 'app-core/services/socket.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [SocketService],
})
export class AppBrowserModule {}
