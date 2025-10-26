import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaoEventosComponent } from './salao-eventos.component';

describe('SalaoEventosComponent', () => {
  let component: SalaoEventosComponent;
  let fixture: ComponentFixture<SalaoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaoEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
