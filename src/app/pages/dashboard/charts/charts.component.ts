import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChartsFacade } from 'app-core/facades/charts.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChartPipe } from 'app-core/pipes/chart.pipe';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ChartPipe,
    NgxEchartsModule,
    NgIf
  ],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts: () => import('echarts') })
    },
  ]
})
export class ChartsComponent {
  upColor = '#00da3c';
  downColor = '#ec0000';
  currentChartPair = 'EURJPY';
  private chartsFacade = inject(ChartsFacade);
  chartConfig = toSignal(this.chartsFacade.getChartById(this.currentChartPair));
}
