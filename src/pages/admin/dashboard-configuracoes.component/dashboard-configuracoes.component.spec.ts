import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConfiguracoesComponent } from './dashboard-configuracoes.component';

describe('DashboardConfiguracoesComponent', () => {
  let component: DashboardConfiguracoesComponent;
  let fixture: ComponentFixture<DashboardConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardConfiguracoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
