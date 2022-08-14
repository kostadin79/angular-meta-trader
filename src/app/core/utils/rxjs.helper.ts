import { Action } from '@ngrx/store';

import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export function mapToPayload<T>(): OperatorFunction<{ payload: T } & Action, T> {
  return (source$: Observable<{ payload: T }>) =>
    source$.pipe(map((action) => action.payload));
}

export function whenTruthy<T>(): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => source$.pipe(filter((x) => !!x));
}

export function whenFalsy<T>(): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => source$.pipe(filter((x) => !x));
}
