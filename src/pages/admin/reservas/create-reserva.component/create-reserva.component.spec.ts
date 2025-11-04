import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservaComponent } from './create-reserva.component';

describe('CreateReservaComponent', () => {
  let component: CreateReservaComponent;
  let fixture: ComponentFixture<CreateReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
