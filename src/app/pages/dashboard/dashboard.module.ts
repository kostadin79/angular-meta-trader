import { NgModule } from '@angular/core';
import { SharedModule } from 'app-shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { LiveQuotesComponent } from './live-quotes/live-quotes.component';
import { OpenPositionsComponent } from './open-positions/open-positions.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardRoutingModule } from './dashboard-routes';
import { ChartPipe } from 'app-core/pipes/chart.pipe';

@NgModule({
  imports: [
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SharedModule,
  ],
  declarations: [
    ChartPipe,
    ChartsComponent,
    DashboardComponent,
    LiveQuotesComponent,
    OpenPositionsComponent,
  ],
})
export class DashboardModule {}
