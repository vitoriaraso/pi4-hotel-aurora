import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEspacoscomunsComponent } from './dashboard-espacoscomuns.component';

describe('DashboardEspacoscomunsComponent', () => {
  let component: DashboardEspacoscomunsComponent;
  let fixture: ComponentFixture<DashboardEspacoscomunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEspacoscomunsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEspacoscomunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
