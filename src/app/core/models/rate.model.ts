import { EntityState } from '@ngrx/entity';

export interface Rate {
  id: string;
  bid: number;
  ask: number;
  symbol: string;
}
export type RateState = EntityState<Rate>;
