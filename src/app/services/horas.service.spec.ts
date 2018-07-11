import { TestBed, inject } from '@angular/core/testing';

import { HorasService } from './horas.service';

describe('HorasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorasService]
    });
  });

  it('should be created', inject([HorasService], (service: HorasService) => {
    expect(service).toBeTruthy();
  }));
});
