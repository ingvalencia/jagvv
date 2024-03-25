import { TestBed } from '@angular/core/testing';

import { UvmApiService } from './uvm-api.service';

describe('UvmApiService', () => {
  let service: UvmApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UvmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
