import { NgModule } from '@angular/core';
import { SharedModule } from 'app-shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { RatesChartsComponent } from './rates-charts/rates-charts.component';
import { LiveQuotesComponent } from './live-quotes/live-quotes.component';
import { OpenPositionsComponent } from './open-positions/open-positions.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardRoutingModule } from './dashboard-routes';

@NgModule({
  imports: [
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    LiveQuotesComponent,
    OpenPositionsComponent,
    RatesChartsComponent,
  ],
})
export class DashboardModule {}
