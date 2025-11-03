import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetailComponent } from './cliente-detail.component';

describe('ClientDetail', () => {
  let component: ClienteDetailComponent;
  let fixture: ComponentFixture<ClienteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
