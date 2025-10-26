import { TestBed } from '@angular/core/testing';

import { EspacosService } from './espacos.service';

describe('EspacosService', () => {
  let service: EspacosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspacosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
