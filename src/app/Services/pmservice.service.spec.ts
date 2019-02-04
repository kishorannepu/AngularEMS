import { TestBed } from '@angular/core/testing';

import { PmserviceService } from './pmservice.service';

describe('PmserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PmserviceService = TestBed.get(PmserviceService);
    expect(service).toBeTruthy();
  });
});
