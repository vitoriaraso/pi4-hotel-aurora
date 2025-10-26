import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaunaComponent } from './sauna.component';

describe('SaunaComponent', () => {
  let component: SaunaComponent;
  let fixture: ComponentFixture<SaunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaunaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
