import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType,} from '@ngrx/effects';
import {initialRatesLoad, initialRatesLoadSuccess, startRatesStream, updateRatesFromStreamSuccess,} from 'app-core/store/actions/rate.actions';
import {concatMap, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {DataService} from 'app-core/services/data.service';
import {select, Store} from '@ngrx/store';
import {selectAllRates} from 'app-core/store/selectors/rates.selectors';
import {RatesDirection} from "app-core/models/enumerations";
import {Rate, rateDirectionStatuses} from "app-core/models/rate.model";

@Injectable()
export class RatesEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store
  ) {}

  initialRatesLoad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initialRatesLoad),
      concatMap(() => {
        return this.dataService
          .getInitialRates()
          .pipe(map((rates) => initialRatesLoadSuccess({ rates })));
      })
    );
  });

  startRatesStream$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startRatesStream),
      switchMap(() => {
        return this.dataService.startRatesStream().pipe(
          withLatestFrom( this.store.pipe(select(selectAllRates))),
          map(([rates, oldRates]) => {
            const changedRates = rates.map((newRate) => {

              const oldRateForCheck = oldRates.find( oldRate => oldRate.id === newRate.id);
              let direction: rateDirectionStatuses = RatesDirection.Initial;

              if (oldRateForCheck) {
                if (
                  oldRateForCheck.bid < newRate.bid ||
                  oldRateForCheck.ask < newRate.ask
                ) {
                  direction = RatesDirection.Up;
                }
                if (
                  oldRateForCheck.bid > newRate.bid ||
                  oldRateForCheck.ask > newRate.ask
                ) {
                  direction = RatesDirection.Down;
                }
              }
              return { ...newRate, direction };
            });


            console.log(changedRates, rates, oldRates);
            debugger;
            return changedRates;
          }),
          map((rates: Rate[]) => updateRatesFromStreamSuccess({ rates }))
        );
      })
    );
  });
}
