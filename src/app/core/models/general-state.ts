import { ConfigurationState } from 'app-core/models/configuration';
import { RateState } from 'app-core/models/rate.model';
import { OpenPositionsState } from 'app-core/models/open-position.model';
import { ChartsState } from 'app-core/models/chart.model';

export interface AppState {
  configuration: ConfigurationState;
  rates: RateState;
  OpenPosition: OpenPositionsState;
  Charts: ChartsState;
}
