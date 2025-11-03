import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEspacoComponent } from './create-espaco.component';

describe('CreateEspacoComponent', () => {
  let component: CreateEspacoComponent;
  let fixture: ComponentFixture<CreateEspacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEspacoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEspacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
