import { EntityState } from '@ngrx/entity';

export interface Chart {
  id: string;
  chart: BaseChart[];
}

export interface BaseChart {
  close: number;
  high: number;
  low: number;
  open: number;
  time: string;
  volume: number;
}

export type ChartsState = EntityState<Chart>;
