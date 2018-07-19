import { TestBed, inject } from '@angular/core/testing';

import { MidwifeService } from './midwife.service';

describe('MidwifeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MidwifeService]
    });
  });

  it('should be created', inject([MidwifeService], (service: MidwifeService) => {
    expect(service).toBeTruthy();
  }));
});
