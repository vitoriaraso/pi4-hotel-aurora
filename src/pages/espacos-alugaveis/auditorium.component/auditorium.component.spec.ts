import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriumComponent } from './auditorium.component';

describe('AuditoriumComponent', () => {
  let component: AuditoriumComponent;
  let fixture: ComponentFixture<AuditoriumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditoriumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
