import { NgModule } from '@angular/core';
import { SharedModule } from 'app-shared/shared.module';
import { SinglePositionComponent } from './open-positions/single-position/single-position.component';
import { DashboardComponent } from './dashboard.component';
import { RatesChartsComponent } from './rates-charts/rates-charts.component';
import { LiveQuotesComponent } from './live-quotes/live-quotes.component';
import { OpenPositionsComponent } from './open-positions/open-positions.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardRoutingModule } from './dashboard-routes';

@NgModule({
  imports: [
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    DashboardRoutingModule,
  ],
  declarations: [
    SinglePositionComponent,
    DashboardComponent,
    RatesChartsComponent,
    LiveQuotesComponent,
    OpenPositionsComponent,
  ],
})
export class DashboardModule {}
