import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { SocketService } from 'app-core/services/socket.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
// import { StateTransferInitializerModule } from '@nguniversal/common';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModule,
    BrowserTransferStateModule,
    // StateTransferInitializerModule
  ],
  providers: [SocketService],
})
export class AppBrowserModule {}
