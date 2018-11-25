import { TestBed } from '@angular/core/testing';

import { HorasService } from './horas.service';

describe('HorasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorasService = TestBed.get(HorasService);
    expect(service).toBeTruthy();
  });
});
