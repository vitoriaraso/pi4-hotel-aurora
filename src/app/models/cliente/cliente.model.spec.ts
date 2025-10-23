import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteModel } from './cliente.model';

describe('ClienteModel', () => {
  let component: ClienteModel;
  let fixture: ComponentFixture<ClienteModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
