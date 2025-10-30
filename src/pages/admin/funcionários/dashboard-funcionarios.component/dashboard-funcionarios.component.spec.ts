import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFuncionariosComponent } from './dashboard-funcionarios.component';

describe('DashboardFuncionariosComponent', () => {
  let component: DashboardFuncionariosComponent;
  let fixture: ComponentFixture<DashboardFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFuncionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
