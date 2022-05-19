import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Rate } from 'app-core/models/rate.model';

export const loadRates = createAction(
  '[Rate/API] Load Rates',
  props<{ rates: Rate[] }>()
);

export const addRate = createAction(
  '[Rate/API] Add Rate',
  props<{ rate: Rate }>()
);

export const upsertRate = createAction(
  '[Rate/API] Upsert Rate',
  props<{ rate: Rate }>()
);

export const addRates = createAction(
  '[Rate/API] Add Rates',
  props<{ rates: Rate[] }>()
);

export const upsertRates = createAction(
  '[Rate/API] Upsert Rates',
  props<{ rates: Rate[] }>()
);

export const updateRate = createAction(
  '[Rate/API] Update Rate',
  props<{ rate: Update<Rate> }>()
);

export const updateRates = createAction(
  '[Rate/API] Update Rates',
  props<{ rates: Update<Rate>[] }>()
);

export const deleteRate = createAction(
  '[Rate/API] Delete Rate',
  props<{ id: string }>()
);

export const deleteRates = createAction(
  '[Rate/API] Delete Rates',
  props<{ ids: string[] }>()
);

export const clearRates = createAction(
  '[Rate/API] Clear Rates'
);
