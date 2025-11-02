import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacaoDetailComponent } from './instalacao-detail.component';

describe('InstalacaoDetailComponent', () => {
  let component: InstalacaoDetailComponent;
  let fixture: ComponentFixture<InstalacaoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstalacaoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstalacaoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
