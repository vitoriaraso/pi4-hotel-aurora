import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacaoService } from './instalacao.service';

describe('InstalacaoService', () => {
  let component: InstalacaoService;
  let fixture: ComponentFixture<InstalacaoService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstalacaoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstalacaoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
