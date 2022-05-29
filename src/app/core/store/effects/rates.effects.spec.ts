import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RatesEffects } from './rates.effects';

describe('RatesEffects', () => {
  let actions$: Observable<any>;
  let effects: RatesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RatesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RatesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
