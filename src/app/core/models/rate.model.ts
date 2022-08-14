import { EntityState } from '@ngrx/entity';

export interface Rate extends BaseRate {
  id: string;
  direction: rateDirectionStatuses;
}

export type rateDirectionStatuses = 'UP' | 'DOWN' | 'INITIAL';

export interface BaseRate {
  bid: number;
  ask: number;
  symbol: string;
}

export type RateState = EntityState<Rate>;
