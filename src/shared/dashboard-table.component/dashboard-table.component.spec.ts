import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTableComponent } from './dashboard-table.component';

describe('DashboardTable', () => {
  let component: DashboardTableComponent;
  let fixture: ComponentFixture<DashboardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
