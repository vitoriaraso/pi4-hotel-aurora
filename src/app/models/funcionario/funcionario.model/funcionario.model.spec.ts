import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioModel } from './funcionario.model';

describe('FuncionarioModel', () => {
  let component: FuncionarioModel;
  let fixture: ComponentFixture<FuncionarioModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
