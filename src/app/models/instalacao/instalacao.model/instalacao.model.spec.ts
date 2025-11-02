import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacaoModel } from './instalacao.model';

describe('InstalacaoModel', () => {
  let component: InstalacaoModel;
  let fixture: ComponentFixture<InstalacaoModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstalacaoModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstalacaoModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
