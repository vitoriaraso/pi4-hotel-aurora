import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstalacaoComponent } from './create-instalacao.component';

describe('CreateInstalacaoComponent', () => {
  let component: CreateInstalacaoComponent;
  let fixture: ComponentFixture<CreateInstalacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstalacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInstalacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
