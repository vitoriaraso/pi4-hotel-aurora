import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReservasComponent } from './dashboard-reservas.component';

describe('DashboardReservasComponent', () => {
  let component: DashboardReservasComponent;
  let fixture: ComponentFixture<DashboardReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
