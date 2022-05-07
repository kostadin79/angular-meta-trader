import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveQuotesComponent } from './dashboard/live-quotes/live-quotes.component';
import { SinglePositionComponent } from './dashboard/open-positions/single-position/single-position.component';
import { RatesChartsComponent } from './dashboard/rates-charts/rates-charts.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { OpenPositionsComponent } from './dashboard/open-positions/open-positions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SinglePositionComponent,
    DashboardComponent,
    RatesChartsComponent,
    LiveQuotesComponent,
    OpenPositionsComponent,
    UserProfileComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    FontAwesomeModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
