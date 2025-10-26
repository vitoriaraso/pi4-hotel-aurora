import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaModel } from './reserva.model';

describe('ReservaModel', () => {
  let component: ReservaModel;
  let fixture: ComponentFixture<ReservaModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
