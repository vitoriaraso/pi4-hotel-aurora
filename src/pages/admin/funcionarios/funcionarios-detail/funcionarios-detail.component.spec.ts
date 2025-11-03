import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosDetailComponent } from './funcionarios-detail.component';

describe('FuncionarioDetail', () => {
  let component: FuncionariosDetailComponent;
  let fixture: ComponentFixture<FuncionariosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
