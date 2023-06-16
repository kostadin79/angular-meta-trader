import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChartsFacade } from 'app-core/facades/charts.facade';
import type { EChartsOption } from 'echarts';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  echartsInstance: any;
  options: EChartsOption;
  upColor = '#00da3c';
  downColor = '#ec0000';
  currentChartPair = 'EURJPY';
  private chartsFacade = inject(ChartsFacade);
  chartConfig = toSignal(this.chartsFacade.getChartById(this.currentChartPair));
}
