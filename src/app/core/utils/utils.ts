import { BaseRate, Rate } from 'app-core/models/rate.model';
import {
  BaseOpenPosition,
  OpenPosition,
} from 'app-core/models/open-position.model';
import { RatesDirection } from 'app-core/models/enumerations';
import { BaseChart, Chart } from 'app-core/models/chart.model';

export function convertRates(rates: BaseRate[]): Rate[] {
  return rates.map(rate => ({
    ...rate,
    id: rate.symbol,
    direction: RatesDirection.Initial,
  }));
}

export function convertOpenPositions(
  openPositions: BaseOpenPosition[]
): OpenPosition[] {
  return openPositions.map(openPosition => ({
    ...openPosition,
    id: openPosition.order,
  }));
}

export function convertChart(baseChart: BaseChart[], symbol: string): Chart {
  return { id: symbol, chart: baseChart };
}

