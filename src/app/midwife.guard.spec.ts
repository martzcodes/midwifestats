import { TestBed, async, inject } from '@angular/core/testing';

import { MidwifeGuard } from './midwife.guard';

describe('MidwifeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MidwifeGuard]
    });
  });

  it('should ...', inject([MidwifeGuard], (guard: MidwifeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
