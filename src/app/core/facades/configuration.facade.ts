import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  appConfiguration,
  socketStatus,
} from 'app-core/store/selectors/configuration.selectors';
import { Observable } from 'rxjs';
import { ConfigurationState } from 'app-core/models/configuration';
import { AppState } from 'app-core/models/general-state';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationFacade {
  constructor(private store: Store<AppState>) {}

  webSocketStatus$: Observable<boolean> = this.store.pipe(select(socketStatus));

  configuration$: Observable<ConfigurationState> = this.store.pipe(
    select(appConfiguration)
  );


}
