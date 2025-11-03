import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInstalacoesComponent } from './dashboard-instalacoes.component';

describe('DashboardInstalacoesComponent', () => {
  let component: DashboardInstalacoesComponent;
  let fixture: ComponentFixture<DashboardInstalacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInstalacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardInstalacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
