import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEspacosComponent } from './dashboard-espacos.component';

describe('DashboardEspacosComponent', () => {
  let component: DashboardEspacosComponent;
  let fixture: ComponentFixture<DashboardEspacosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEspacosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEspacosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
