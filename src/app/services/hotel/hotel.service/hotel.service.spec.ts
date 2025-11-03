import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelService } from './hotel.service';

describe('HotelService', () => {
  let component: HotelService;
  let fixture: ComponentFixture<HotelService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
