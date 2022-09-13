import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreStoreModule } from 'app-core/store/core-store.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreStoreModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
