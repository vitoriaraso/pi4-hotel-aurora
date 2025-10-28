import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHoteisComponent } from './dashboard-hoteis.component';

describe('DashboardHoteisComponent', () => {
  let component: DashboardHoteisComponent;
  let fixture: ComponentFixture<DashboardHoteisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHoteisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHoteisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
