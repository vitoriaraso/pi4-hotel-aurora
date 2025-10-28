import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInstalacoesalugaveisComponent } from './dashboard-instalacoesalugaveis.component';

describe('DashboardInstalacoesalugaveisComponent', () => {
  let component: DashboardInstalacoesalugaveisComponent;
  let fixture: ComponentFixture<DashboardInstalacoesalugaveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInstalacoesalugaveisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardInstalacoesalugaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
