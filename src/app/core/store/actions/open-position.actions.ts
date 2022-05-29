import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { OpenPosition } from '../../models/open-position.model';


export const initialOpenPositionsLoad = createAction(
  '[OpenPosition/API] Get Initial Open Position Data'
);
export const initialOpenPositionsLoadSuccess = createAction(
  '[OpenPosition/API] Get Initial Open Position Data Success',
  props<{ openPositions: OpenPosition[] }>()
);
export const startOpenPositionsStream = createAction(
  '[OpenPosition/API] Start Open Position Stream'
);

export const updateOpenPositionsFromStreamSuccess = createAction(
  '[OpenPosition/API] Update Open Position From Stream Success',
  props<{ openPositions: OpenPosition[] }>()
);





export const loadOpenPositions = createAction(
  '[OpenPosition/API] Load OpenPositions',
  props<{ openPositions: OpenPosition[] }>()
);

export const addOpenPosition = createAction(
  '[OpenPosition/API] Add OpenPosition',
  props<{ openPosition: OpenPosition }>()
);

export const upsertOpenPosition = createAction(
  '[OpenPosition/API] Upsert OpenPosition',
  props<{ openPosition: OpenPosition }>()
);

export const addOpenPositions = createAction(
  '[OpenPosition/API] Add OpenPositions',
  props<{ openPositions: OpenPosition[] }>()
);

export const upsertOpenPositions = createAction(
  '[OpenPosition/API] Upsert OpenPositions',
  props<{ openPositions: OpenPosition[] }>()
);

export const updateOpenPosition = createAction(
  '[OpenPosition/API] Update OpenPosition',
  props<{ openPosition: Update<OpenPosition> }>()
);

export const updateOpenPositions = createAction(
  '[OpenPosition/API] Update OpenPositions',
  props<{ openPositions: Update<OpenPosition>[] }>()
);

export const deleteOpenPosition = createAction(
  '[OpenPosition/API] Delete OpenPosition',
  props<{ id: string }>()
);

export const deleteOpenPositions = createAction(
  '[OpenPosition/API] Delete OpenPositions',
  props<{ ids: string[] }>()
);

export const clearOpenPositions = createAction(
  '[OpenPosition/API] Clear OpenPositions'
);
