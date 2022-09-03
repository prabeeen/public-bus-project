import { TestBed } from '@angular/core/testing';

import { TransferGpsService } from './transfer-gps.service';

describe('TransferGpsService', () => {
  let service: TransferGpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferGpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
