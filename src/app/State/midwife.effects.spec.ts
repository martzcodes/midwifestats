import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MidwifeEffects } from './midwife.effects';

describe('MidwifeService', () => {
  let actions$: Observable<any>;
  let effects: MidwifeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MidwifeEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(MidwifeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
