import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveComponent } from './reserve.component';

describe('Reserve', () => {
  let component: ReserveComponent;
  let fixture: ComponentFixture<ReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
