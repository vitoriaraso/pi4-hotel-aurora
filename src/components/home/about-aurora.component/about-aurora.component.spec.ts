import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAuroraComponent } from './about-aurora.component';

describe('AboutAuroraComponent', () => {
  let component: AboutAuroraComponent;
  let fixture: ComponentFixture<AboutAuroraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutAuroraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAuroraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
