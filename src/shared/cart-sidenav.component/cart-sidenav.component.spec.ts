import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSidenavComponent } from './cart-sidenav.component';

describe('CartSidenavComponent', () => {
  let component: CartSidenavComponent;
  let fixture: ComponentFixture<CartSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
