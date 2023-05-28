import { TestBed } from '@angular/core/testing';
import {
  StoreWithSnapshots,
  provideStoreSnapshots,
} from 'app-core/utils/test.helper';

import { StoreModule } from '@ngrx/store';
import { reducers } from 'app-core/store/core-store.module';

import { socketStatus } from 'app-core/store/selectors/configuration.selectors';
import { loadConnectWebsocketsSuccess } from 'app-core/store/actions/configuration.actions';

describe('Configuration Selectors', () => {
  let store$: StoreWithSnapshots;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [provideStoreSnapshots()],
    });

    store$ = TestBed.inject(StoreWithSnapshots);
  });

  describe('websocket state selector', () => {
    it('should be false on initial setup', () => {
      expect(socketStatus(store$.state)).toBeFalse();
    });
  });

  describe('selectors should have data', () => {
    beforeEach(() => {
      store$.dispatch(loadConnectWebsocketsSuccess());
    });
    it('should be true action is dispatched', () => {
      expect(socketStatus(store$.state)).toBeTruthy();
    });
  });
});
