import { TestBed } from '@angular/core/testing';

import { BuyPopUpService } from './buy-pop-up.service';

describe('BuyPopUpService', () => {
  let service: BuyPopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyPopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
