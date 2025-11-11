import { TestBed } from '@angular/core/testing';

import { OrcamentoModel } from './orcamento.model';

describe('OrcamentoModel', () => {
  let service: OrcamentoModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrcamentoModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
