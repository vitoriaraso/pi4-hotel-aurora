import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spa } from './spa';

describe('Spa', () => {
  let component: Spa;
  let fixture: ComponentFixture<Spa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
