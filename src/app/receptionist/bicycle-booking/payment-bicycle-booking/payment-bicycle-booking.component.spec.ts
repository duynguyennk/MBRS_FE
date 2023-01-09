import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBicycleBookingComponent } from './payment-bicycle-booking.component';

describe('PaymentBicycleBookingComponent', () => {
  let component: PaymentBicycleBookingComponent;
  let fixture: ComponentFixture<PaymentBicycleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBicycleBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBicycleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
