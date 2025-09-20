import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rooms } from './rooms';

describe('Rooms', () => {
  let component: Rooms;
  let fixture: ComponentFixture<Rooms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rooms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rooms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
