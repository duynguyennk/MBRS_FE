import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFoodBookingComponent } from './payment-food-booking.component';

describe('PaymentFoodBookingComponent', () => {
  let component: PaymentFoodBookingComponent;
  let fixture: ComponentFixture<PaymentFoodBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFoodBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFoodBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
