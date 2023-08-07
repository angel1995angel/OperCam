import { TestBed } from '@angular/core/testing';

import { OficinacomercialService } from './oficinacomercial.service';

describe('OficinacomercialService', () => {
  let service: OficinacomercialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OficinacomercialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
