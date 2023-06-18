import { Pipe, PipeTransform } from '@angular/core';
import { BaseChart, Chart } from 'app-core/models/chart.model';
import { EChartsOption } from 'echarts';

@Pipe({ name: 'chartPipe', pure: true, standalone: true })
export class ChartPipe implements PipeTransform {
  transform(
    value: Chart,
    currentChartPair: string,
    downColor: string,
    upColor: string
  ): EChartsOption {
    const formattedChartData =
      value !== undefined ? formatChartData(value.chart) : [];
    const chartData = splitData(formattedChartData);
    return {
      animation: false,
      legend: {
        bottom: 0,
        left: 'center',
        data: [currentChartPair, 'MA5', 'MA10', 'MA20', 'MA30'],
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
        position(
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
        link: [{ xAxisIndex: 'all' }],
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
            color: downColor,
          },
          {
            value: -1,
            color: upColor,
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
          name: currentChartPair,
          type: 'candlestick',
          data: chartData.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
          },
          tooltip: {
            formatter(param: any) {
              return [
                `Date: ${param[0].name}<hr size=1 style="margin: 3px 0">`,
                `Open: ${param[0].data[0]}<br/>`,
                `Close: ${param[0].data[1]}<br/>`,
                `Lowest: ${param[0].data[2]}<br/>`,
                `Highest: ${param[0].data[3]}<br/>`,
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
  }
}

function formatChartData(
  data: BaseChart[]
): [string, number, number, number, number, number][] {
  return data.map((chart: BaseChart) => [
    chart.time.substr(0, 10).replace(/\./g, '-'),
    chart.open,
    chart.close,
    chart.low,
    chart.high,
    chart.volume,
  ]);
}

function splitData(
  rawData: [string, number, number, number, number, number][]
): { categoryData: string[]; values: number[][]; volumes: number[][] } {
  const categoryData: string[] = [];
  const values: number[][] = [];
  const volumes: number[][] = [];
  rawData.forEach((value, index) => {
    categoryData.push(value[0]);
    values.push([value[1], value[2], value[3], value[4]]);
    volumes.push([index, value[5], value[1] > value[2] ? 1 : -1]);
  });

  return {
    categoryData,
    values,
    volumes,
  };
}

function calculateMA(
  dayCount: number,
  data: { categoryData?: any[]; values: any[][]; volumes?: any[][] }
) {
  const result = [];
  for (let i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}
