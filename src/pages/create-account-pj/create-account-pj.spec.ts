import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPJ } from './create-account-pj';

describe('CreateAccountPJ', () => {
  let component: CreateAccountPJ;
  let fixture: ComponentFixture<CreateAccountPJ>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountPJ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountPJ);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
