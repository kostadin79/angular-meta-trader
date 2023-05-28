import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ConfigurationEffects } from './configuration.effects';
import { DataService } from 'app-core/services/data.service';
import { instance, mock } from 'ts-mockito';
import { Action } from '@ngrx/store';

describe('Configuration effects', () => {
  let actions$: Observable<Action>;
  let effects: ConfigurationEffects;
  let dataServiceMock: DataService;

  beforeEach(() => {
    dataServiceMock = mock(DataService);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ConfigurationEffects,
        provideMockActions(() => actions$),
        { provide: DataService, useFactory: () => instance(dataServiceMock) },
      ],
    });
    effects = TestBed.inject(ConfigurationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
