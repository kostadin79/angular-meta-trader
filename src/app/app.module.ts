import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveQuotesComponent } from './dashboard/live-quotes/live-quotes.component';
import { SinglePositionComponent } from './dashboard/open-positions/single-position/single-position.component';
import { RatesChartsComponent } from './dashboard/rates-charts/rates-charts.component';
import {NgxEchartsModule} from "ngx-echarts";
import {OpenPositionsComponent} from "./dashboard/open-positions/open-positions.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SinglePositionComponent,
    DashboardComponent,
    RatesChartsComponent,
    LiveQuotesComponent,
    OpenPositionsComponent
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    FontAwesomeModule
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
