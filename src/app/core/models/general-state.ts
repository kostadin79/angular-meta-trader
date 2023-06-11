import { ConfigurationState } from 'app-core/models/configuration';
import { RateState } from 'app-core/models/rate.model';
import { OpenPositionsState } from 'app-core/models/open-position.model';
import { ChartsState } from 'app-core/models/chart.model';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from 'app-core/models/router-state.model';

export interface AppState {
  configuration: ConfigurationState;
  rates: RateState;
  OpenPosition: OpenPositionsState;
  Charts: ChartsState;
  router: RouterReducerState<RouterStateUrl>;
}
