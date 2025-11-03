import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacoDetailComponent } from './espaco-detail.component';

describe('EspacoDetailComponent', () => {
  let component: EspacoDetailComponent;
  let fixture: ComponentFixture<EspacoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspacoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
