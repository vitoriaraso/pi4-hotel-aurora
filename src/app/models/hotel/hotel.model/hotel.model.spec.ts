import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelModel } from './hotel.model';

describe('HotelModel', () => {
  let component: HotelModel;
  let fixture: ComponentFixture<HotelModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
