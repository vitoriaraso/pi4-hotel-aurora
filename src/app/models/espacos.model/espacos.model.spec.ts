import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacosModel } from './espacos.model';

describe('EspacosModel', () => {
  let component: EspacosModel;
  let fixture: ComponentFixture<EspacosModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacosModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspacosModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
