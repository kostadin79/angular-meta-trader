
import { Action } from '@ngrx/store';

import {
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  of,
  throwError,
} from 'rxjs';
import {
  catchError,
  filter,
  map,
} from 'rxjs/operators';

// import { HttpError } from 'ish-core/models/http-error/http-error.model';

// export function mapErrorToAction<S, T>(actionType: (props: { error: HttpError }) => T, extras?: object) {
//   return (source$: Observable<S | T>) =>
//     source$.pipe(
//       catchError((error: HttpError) => {
//         if (error.name !== 'HttpErrorResponse') {
//           // rethrow runtime errors
//           return throwError(() => error);
//         }
//         const errorAction = actionType({ error, ...extras });
//         return of(errorAction);
//       })
//     );
// }

// export function mapToProperty<T, K extends keyof T>(property: K) {
//   return (source$: Observable<T>) => source$.pipe<T[K]>(map(x => (x ? x[property] : undefined)));
// }

export function mapToPayload<T>(): OperatorFunction<{ payload: T } & Action, T> {
  return (source$: Observable<{ payload: T }>) => source$.pipe(map(action => action.payload));
}

// export function mapToPayloadProperty<T, K extends keyof T>(key: K): OperatorFunction<{ payload: T } & Action, T[K]> {
//   return (source$: Observable<{ payload: T }>) =>
//     source$.pipe(
//       map((action) => action.payload),
//       mapToProperty(key)
//     );
// }

export function whenTruthy<T>(): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => source$.pipe(filter(x => !!x));
}

export function whenFalsy<T>(): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => source$.pipe(filter(x => !x));
}
