import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFuncionarioComponent } from './create-funcionario.component';

describe('CreateFuncionarioComponent', () => {
  let component: CreateFuncionarioComponent;
  let fixture: ComponentFixture<CreateFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
