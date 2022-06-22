import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'app-core/services/data.service';
import { ChartsFacade } from 'app-core/facades/charts.facade';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { formatChartData, splitData, calculateMA } from 'app-core/utils/utils';
import { whenTruthy } from 'app-core/utils/rxjs.helper';
import type { EChartsOption, ECharts, SetOptionOpts } from 'echarts';

@Component({
  selector: 'app-rates-charts',
  templateUrl: './rates-charts.component.html',
  styleUrls: ['./rates-charts.component.scss'],
})
export class RatesChartsComponent implements OnInit, OnDestroy {
  echartsInstance: any;
  options: any;
  upColor = '#00da3c';
  downColor = '#ec0000';
  currentChartPair = 'EURJPY';
  private destroy$ = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    private chartsFacade: ChartsFacade
  ) {}

  ngOnInit() {
    this.chartsFacade.getChart(this.currentChartPair);

    this.chartsFacade
      .getChartById(this.currentChartPair)
      .pipe(whenTruthy(), take(1), takeUntil(this.destroy$))
      .subscribe((value) => {
        const formatedChartData = value !== undefined ? formatChartData(value.chart) : [];
        const chartData = splitData(formatedChartData);
        this.options = {
          animation: false,
          legend: {
            bottom: 0,
            left: 'center',
            data: [this.currentChartPair, 'MA5', 'MA10', 'MA20', 'MA30'],
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
              color: '#000',
            },
            position: function (
              pos: number[],
              params: any,
              el: any,
              elRect: any,
              size: { viewSize: number[] }
            ) {
              const obj: any = { top: 10 };
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
              return obj;
            },
            // extraCssText: 'width: 170px'
          },
          axisPointer: {
            link: { xAxisIndex: 'all' },
            label: {
              backgroundColor: '#777',
            },
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: false,
              },
              brush: {
                type: ['lineX', 'clear'],
              },
            },
          },
          brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
              colorAlpha: 0.1,
            },
          },
          visualMap: {
            show: false,
            seriesIndex: 5,
            dimension: 2,
            pieces: [
              {
                value: 1,
                color: this.downColor,
              },
              {
                value: -1,
                color: this.upColor,
              },
            ],
          },
          grid: [
            {
              left: '10%',
              right: '8%',
              height: '50%',
            },
            {
              left: '10%',
              right: '8%',
              top: '63%',
              height: '16%',
            },
          ],
          xAxis: [
            {
              type: 'category',
              data: chartData.categoryData,
              scale: true,
              boundaryGap: false,
              axisLine: { onZero: false },
              splitLine: { show: false },
              splitNumber: 20,
              min: 'dataMin',
              max: 'dataMax',
              axisPointer: {
                z: 100,
              },
            },
            {
              type: 'category',
              gridIndex: 1,
              data: chartData.categoryData,
              scale: true,
              boundaryGap: false,
              axisLine: { onZero: false },
              axisTick: { show: false },
              splitLine: { show: false },
              axisLabel: { show: false },
              splitNumber: 20,
              min: 'dataMin',
              max: 'dataMax',
            },
          ],
          yAxis: [
            {
              scale: true,
              splitArea: {
                show: true,
              },
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false },
            },
          ],
          dataZoom: [
            {
              type: 'inside',
              xAxisIndex: [0, 1],
              start: 30,
              end: 100,
            },
            {
              show: true,
              xAxisIndex: [0, 1],
              type: 'slider',
              top: '85%',
              start: 98,
              end: 100,
            },
          ],
          series: [
            {
              name: this.currentChartPair,
              type: 'candlestick',
              data: chartData.values,
              itemStyle: {
                color: this.upColor,
                color0: this.downColor,
                borderColor: null,
                borderColor0: null,
              },
              tooltip: {
                formatter: function (param: any) {
                  debugger;
                  param = param[0];
                  console.log('param', param);
                  return [
                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                    'Open: ' + param.data[0] + '<br/>',
                    'Close: ' + param.data[1] + '<br/>',
                    'Lowest: ' + param.data[2] + '<br/>',
                    'Highest: ' + param.data[3] + '<br/>',
                  ].join('');
                },
              },
            },
            {
              name: 'MA5',
              type: 'line',
              data: calculateMA(5, chartData),
              smooth: true,
              lineStyle: {
                opacity: 0.5,
              },
            },
            {
              name: 'MA10',
              type: 'line',
              data: calculateMA(10, chartData),
              smooth: true,
              lineStyle: {
                opacity: 0.5,
              },
            },
            {
              name: 'MA20',
              type: 'line',
              data: calculateMA(20, chartData),
              smooth: true,
              lineStyle: {
                opacity: 0.5,
              },
            },
            {
              name: 'MA30',
              type: 'line',
              data: calculateMA(30, chartData),
              smooth: true,
              lineStyle: {
                opacity: 0.5,
              },
            },
            {
              name: 'Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: chartData.volumes,
            },
          ],
        };
      });
  }

  onChartInit(ec: any) {
    this.echartsInstance = ec;
    console.log(this.echartsInstance);
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
