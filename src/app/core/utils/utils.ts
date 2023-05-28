import { BaseRate, Rate } from 'app-core/models/rate.model';
import {
  BaseOpenPosition,
  OpenPosition,
} from 'app-core/models/open-position.model';
import { RatesDirection } from 'app-core/models/enumerations';
import { BaseChart, Chart } from 'app-core/models/chart.model';

export function convertRates(rates: BaseRate[]): Rate[] {
  return rates.map((rate) => ({
    ...rate,
    id: rate.symbol,
    direction: RatesDirection.Initial,
  }));
}

export function convertOpenPositions(
  openPositions: BaseOpenPosition[]
): OpenPosition[] {
  return openPositions.map((openPosition) => ({
    ...openPosition,
    id: openPosition.order,
  }));
}

export function convertChart(baseChart: BaseChart[], symbol: string): Chart {
  return { id: symbol, chart: baseChart };
}

export function formatChartData(
  data: BaseChart[]
): [string, number, number, number, number, number][] {
  return data.map((chart: BaseChart) => {
    return [
      chart.time.substr(0, 10).replace(/\./g, '-'),
      chart.open,
      chart.close,
      chart.low,
      chart.high,
      chart.volume,
    ];
  });
}

export function splitData(
  rawData: [string, number, number, number, number, number][]
): {categoryData: string[], values: number[][], volumes: number[][] } {
  const categoryData: string[] = [];
  const values: number[][] = [];
  const volumes: number[][] = [];
  rawData.forEach((value, index) => {
    categoryData.push(value[0]);
    values.push([value[1], value[2], value[3], value[4]]);
    volumes.push([index, value[5], value[1] > value[2] ? 1 : -1]);
  });

  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes,
  };
}

export function calculateMA(
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
