import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPF } from './create-account-pf';

describe('CreateAccountPF', () => {
  let component: CreateAccountPF;
  let fixture: ComponentFixture<CreateAccountPF>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountPF]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountPF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
