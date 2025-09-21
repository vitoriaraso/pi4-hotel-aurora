import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceRoom } from './conference-room';

describe('ConferenceRoom', () => {
  let component: ConferenceRoom;
  let fixture: ComponentFixture<ConferenceRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferenceRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
