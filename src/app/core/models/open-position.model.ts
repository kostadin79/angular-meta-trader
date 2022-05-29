import { EntityState } from "@ngrx/entity";

export interface OpenPosition extends BaseOpenPosition{
  id: number;
}

export interface BaseOpenPosition {
  comment: string;
  commission: number;
  open_time: string;
  order: number;
  price: number;
  profit: number;
  sl: number;
  swap: number;
  symbol: string;
  tp: number;
  type: number;
  volume: number;
}

export type OpenPositionsState = EntityState<OpenPosition>;
