import { TestBed } from '@angular/core/testing';

import { FechaValidarService } from './fecha-validar.service';

describe('FechaValidarService', () => {
  let service: FechaValidarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechaValidarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
