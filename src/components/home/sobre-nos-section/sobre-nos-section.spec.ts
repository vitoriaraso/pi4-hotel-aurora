import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNosSection } from './sobre-nos-section';

describe('SobreNosSection', () => {
  let component: SobreNosSection;
  let fixture: ComponentFixture<SobreNosSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreNosSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreNosSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
