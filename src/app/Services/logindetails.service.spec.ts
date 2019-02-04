import { TestBed } from '@angular/core/testing';

import { LogindetailsService } from './logindetails.service';

describe('LogindetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogindetailsService = TestBed.get(LogindetailsService);
    expect(service).toBeTruthy();
  });
});
