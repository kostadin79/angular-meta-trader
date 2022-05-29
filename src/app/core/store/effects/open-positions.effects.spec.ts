import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OpenPositionsEffects } from './open-positions.effects';

describe('OpenPositionsEffects', () => {
  let actions$: Observable<any>;
  let effects: OpenPositionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpenPositionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(OpenPositionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
